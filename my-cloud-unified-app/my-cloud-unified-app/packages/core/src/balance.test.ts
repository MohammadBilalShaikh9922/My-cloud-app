import { describe, expect, it } from 'vitest';
import { chooseStorageAccount, type StorageAccount } from './balance';

const GB = 1024 ** 3;
const accounts: StorageAccount[] = [
  { id: 'A', totalBytes: 15*GB, usedBytes: 8*GB, connected: true, healthy: true },
  { id: 'B', totalBytes: 15*GB, usedBytes: 5*GB, connected: true, healthy: true },
  { id: 'C', totalBytes: 15*GB, usedBytes: 10*GB, connected: true, healthy: true },
];

describe('chooseStorageAccount', () => {
  it('chooses the account with the lowest projected utilization that fits', () => {
    const result = chooseStorageAccount(accounts, 4*GB, 0);
    expect(result).toEqual({ ok: true, accountId: 'B', projectedUtilization: 9/15 });
  });
  it('never chooses disconnected or unhealthy accounts', () => {
    const result = chooseStorageAccount(accounts.map(a => ({ ...a, connected: false })), 1, 0);
    expect(result).toEqual({ ok: false, reason: 'NO_AVAILABLE_ACCOUNT' });
  });
  it('returns insufficient capacity when file does not fit any account', () => {
    const result = chooseStorageAccount(accounts, 20*GB, 0);
    expect(result).toEqual({ ok: false, reason: 'INSUFFICIENT_CAPACITY' });
  });
  it('rejects invalid file sizes', () => {
    expect(() => chooseStorageAccount(accounts, -1)).toThrow();
  });
  it('ignores malformed account capacity', () => {
    const result = chooseStorageAccount([{ ...accounts[0], usedBytes: 100*GB }], 1, 0);
    expect(result).toEqual({ ok: false, reason: 'NO_AVAILABLE_ACCOUNT' });
  });
});
