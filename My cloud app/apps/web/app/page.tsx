'use client';

const stats = [
  { label: 'Virtual storage', value: '— GB', detail: 'Connect accounts to calculate totals' },
  { label: 'Connected accounts', value: '0', detail: 'Google accounts' },
  { label: 'Unified inbox', value: '—', detail: 'Messages indexed after connection' },
];
const files = [
  { name: 'No files indexed yet', type: 'Connect Google Drive to see your files', size: '—', account: '—' },
];
export default function Home() {
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brandIcon">☁</span><span>my cloud</span></div>
      <div className="navLabel">WORKSPACE</div>
      <a className="nav active" href="/">▦ <span>Dashboard</span></a>
      <a className="nav" href="#drive">▤ <span>Virtual Drive</span></a>
      <a className="nav" href="#gmail">✉ <span>Unified Gmail</span></a>
      <a className="nav" href="#accounts">◉ <span>Connected accounts</span></a>
      <div className="sidebarBottom"><a className="nav" href="#settings">⚙ <span>Settings</span></a><div className="userChip"><div className="avatar">U</div><div><b>Your workspace</b><small>Starter environment</small></div></div></div>
    </aside>
    <section className="content">
      <header className="topbar"><div><div className="eyebrow">PERSONAL CLOUD WORKSPACE</div><h1>Good evening 👋</h1><p className="muted">One place for your connected Google accounts.</p></div><button className="primary" onClick={() => document.getElementById('accounts')?.scrollIntoView({behavior:'smooth'})}>＋ Connect Google account</button></header>
      <div className="notice"><span>ⓘ</span><div><b>Virtual storage, not merged Google quotas</b><p>Your accounts keep their own Google storage limits. My Cloud will show an aggregate view after accounts are connected.</p></div></div>
      <div className="stats">{stats.map((s) => <article className="stat" key={s.label}><div className="statTop"><span>{s.label}</span><span className="statGlyph">{s.label === 'Virtual storage' ? '▤' : s.label === 'Connected accounts' ? '◉' : '✉'}</span></div><strong>{s.value}</strong><small>{s.detail}</small></article>)}</div>
      <div className="sectionHeader" id="drive"><div><h2>Recent files</h2><p className="muted">Files from your connected drives will appear here.</p></div><a href="#drive">View Drive →</a></div>
      <div className="table"><div className="tableHead"><span>NAME</span><span>SIZE</span><span>GOOGLE ACCOUNT</span></div>{files.map(f=><div className="fileRow" key={f.name}><div className="fileName"><span className="fileIcon">▧</span><div><b>{f.name}</b><small>{f.type}</small></div></div><span>{f.size}</span><span>{f.account}</span></div>)}</div>
      <div className="bottomGrid">
        <article className="panel" id="gmail"><div className="panelHead"><h2>Unified Gmail</h2><span className="pill">Not connected</span></div><div className="emptyIcon">✉</div><h3>Your inbox, together</h3><p>Connect accounts to read and search mail from one view.</p></article>
        <article className="panel" id="accounts"><div className="panelHead"><h2>Google accounts</h2><span className="pill">0 connected</span></div><div className="emptyIcon">◎</div><h3>Bring your accounts together</h3><p>Authorize each account through Google's official consent flow.</p><button className="secondary" disabled>Google OAuth coming in Phase 2</button></article>
      </div>
      <footer id="settings">My Cloud Starter · Phase 1 foundation <span>Privacy-first by design</span></footer>
    </section>
  </main>;
}
