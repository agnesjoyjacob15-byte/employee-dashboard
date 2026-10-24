import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CircleAlert, ExternalLink, Mail, Plus, RefreshCw, Search, UsersRound } from 'lucide-react';

const API = 'https://jsonplaceholder.typicode.com/users';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('id');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = setTimeout(() => controller.abort(), 20000);
    setStatus('loading');
    async function load() {
      try {
        const response = await fetch(API, { signal: controller.signal });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        if (!Array.isArray(data) || !data.every(item => Number.isInteger(item.id) && typeof item.name === 'string' && typeof item.email === 'string')) throw new Error('Unexpected API data');
        if (active) { setEmployees(data); setStatus('ready'); }
      } catch {
        if (active) setStatus('error');
      } finally { clearTimeout(timer); }
    }
    load();
    return () => { active = false; controller.abort(); clearTimeout(timer); };
  }, [refresh]);

  const term = search.trim().toLowerCase();
  const visible = employees.filter(employee => `${employee.id} ${employee.name} ${employee.email}`.toLowerCase().includes(term));
  visible.sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'name-desc' ? b.name.localeCompare(a.name) : a.id - b.id);
  const count = status === 'ready' ? employees.length : '—';

  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">THE PEOPLE WORKSPACE</p><h1>Employee Dashboard<span>.</span></h1><p className="page-subtitle">A better view of the people you work with.</p></div><Link className="btn btn-primary" to="/employee-form"><Plus size={17} aria-hidden="true" />Employee form</Link></section>
      <section className="welcome-banner" aria-label="Directory overview"><div className="banner-copy"><span className="banner-kicker">A LITTLE MORE CONNECTED</span><h2>Good work starts<br />with good people.</h2><p>Your employee directory, thoughtfully in one place.</p></div><div className="banner-stat"><span className="banner-stat-icon"><UsersRound size={25} strokeWidth={1.5} aria-hidden="true" /></span><strong>{count}</strong><span>people in the directory</span></div><div className="banner-decoration" aria-hidden="true"><i /><i /><i /></div></section>
      <section className="panel directory-panel" aria-labelledby="directory-title" aria-busy={status === 'loading'}>
        <div className="directory-toolbar"><div className="directory-title"><h2 id="directory-title">All employees</h2><span className="count-pill">{count}</span></div><button className="btn refresh-btn" disabled={status === 'loading'} onClick={() => setRefresh(value => value + 1)}><RefreshCw size={15} aria-hidden="true" />Refresh</button></div>
        <div className="filter-bar"><label className="search-control"><Search size={17} aria-hidden="true" /><span className="visually-hidden">Search employees</span><input type="search" className="form-control" placeholder="Search by name, email or ID…" value={search} onChange={event => setSearch(event.target.value)} /></label><label className="sort-control"><span>Sort by</span><select className="form-select" aria-label="Sort employees" value={sort} onChange={event => setSort(event.target.value)}><option value="id">Employee ID</option><option value="name">Name A–Z</option><option value="name-desc">Name Z–A</option></select></label></div>
        {status === 'loading' ? <div className="empty-state" role="status"><span className="spinner-border" aria-hidden="true" /><h3>Finding your people…</h3><p>Loading the employee directory.</p></div> : status === 'error' ? <div className="empty-state" role="alert"><CircleAlert size={30} aria-hidden="true" /><h3>We couldn’t reach the directory.</h3><p>Check your internet connection, then try again.</p><button className="btn btn-primary" onClick={() => setRefresh(value => value + 1)}>Try again <ArrowRight size={15} aria-hidden="true" /></button></div> : visible.length === 0 ? <div className="empty-state" role="status"><Search size={28} aria-hidden="true" /><h3>{employees.length ? 'No employees found.' : 'No employees to display.'}</h3><p>{employees.length ? 'Try another name, email address or employee ID.' : 'The API returned an empty directory.'}</p>{search ? <button className="btn btn-outline-secondary" onClick={() => setSearch('')}>Clear search</button> : null}</div> : <div className="table-responsive"><table className="table employee-table mb-0"><caption className="visually-hidden">Employee ID, name and email address from JSONPlaceholder</caption><thead><tr><th scope="col">EMPLOYEE ID</th><th scope="col">NAME</th><th scope="col">EMAIL ADDRESS</th></tr></thead><tbody>{visible.map(employee => <tr key={employee.id}><td className="id-cell">#{String(employee.id).padStart(3, '0')}</td><td><span className="name-cell"><span className={`initials tone-${employee.id % 5}`} aria-hidden="true">{employee.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('')}</span>{employee.name}</span></td><td><a className="email-link" href={`mailto:${employee.email}`}><Mail size={14} aria-hidden="true" />{employee.email}</a></td></tr>)}</tbody></table></div>}
        <div className="directory-footer"><span role="status">{status === 'ready' ? `Showing ${visible.length} of ${employees.length} employees` : status === 'loading' ? 'Connecting to the directory…' : 'Directory unavailable'}</span><a href={API} target="_blank" rel="noreferrer">JSONPlaceholder API <ExternalLink size={11} aria-hidden="true" /></a></div>
      </section>
      <p className="dashboard-note">Behind every name, a person. Behind every team, a connection.</p>
    </>
  );
}
