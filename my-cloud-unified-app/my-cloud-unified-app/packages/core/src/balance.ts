export type StorageAccount = {
  id: string;
  totalBytes: number;
  usedBytes: number;
  connected: boolean;
  healthy: boolean;
};

export type BalanceResult =
  | { ok: true; accountId: string; projectedUtilization: number }
  | { ok: false; reason: 'NO_AVAILABLE_ACCOUNT' | 'INSUFFICIENT_CAPACITY' };

const valid = (a: StorageAccount) =>
  Number.isFinite(a.totalBytes) && Number.isFinite(a.usedBytes) &&
  a.totalBytes > 0 && a.usedBytes >= 0 && a.usedBytes <= a.totalBytes;

/**
 * Select a single destination for a whole file. The score prefers the lowest
 * projected utilization after upload, with a small penalty for low remaining
 * capacity. Disconnected/unhealthy accounts are never candidates.
 *
 * `safetyMarginBytes` reserves headroom for provider quota drift and concurrent
 * uploads. Production callers should also reserve capacity transactionally in
 * the DB/job system to avoid two simultaneous uploads overbooking an account.
 */
export function chooseStorageAccount(
  accounts: StorageAccount[],
  fileSizeBytes: number,
  safetyMarginBytes = 64 * 1024 * 1024
): BalanceResult {
  if (!Number.isFinite(fileSizeBytes) || fileSizeBytes < 0) {
    throw new Error('fileSizeBytes must be a non-negative finite number');
  }
  const candidates = accounts.filter(a => valid(a) && a.connected && a.healthy);
  if (candidates.length === 0) return { ok: false, reason: 'NO_AVAILABLE_ACCOUNT' };

  const fits = candidates.filter(a => (a.totalBytes - a.usedBytes - safetyMarginBytes) >= fileSizeBytes);
  if (fits.length === 0) return { ok: false, reason: 'INSUFFICIENT_CAPACITY' };

  fits.sort((a, b) => {
    const ua = (a.usedBytes + fileSizeBytes) / a.totalBytes;
    const ub = (b.usedBytes + fileSizeBytes) / b.totalBytes;
    if (Math.abs(ua - ub) > 1e-9) return ua - ub;
    const freeA = a.totalBytes - a.usedBytes;
    const freeB = b.totalBytes - b.usedBytes;
    return freeB - freeA || a.id.localeCompare(b.id);
  });
  const winner = fits[0];
  return { ok: true, accountId: winner.id, projectedUtilization: (winner.usedBytes + fileSizeBytes) / winner.totalBytes };
}
