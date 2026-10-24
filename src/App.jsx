import { useEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import { ArrowRight, House, UserRoundPlus } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeForm from './pages/EmployeeForm.jsx';

export default function App() {
  const { pathname } = useLocation();
  const main = useRef(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const title = pathname === '/' ? 'Employee Dashboard' : pathname === '/employee-form' ? 'Employee Form' : 'Page not found';
    document.title = `${title} | Colleague`;
    if (previousPath.current !== pathname) {
      main.current?.focus();
      window.scrollTo(0, 0);
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); }}>Skip to content</a>
      <header className="site-header"><nav className="navbar container page-width" aria-label="Main navigation">
        <Link className="wordmark" to="/" aria-label="Colleague home"><span className="brand-symbol" aria-hidden="true">c<span /></span>colleague<span className="wordmark-dot">.</span></Link>
        <div className="main-nav"><NavLink to="/" end><House size={16} aria-hidden="true" />Home</NavLink><NavLink to="/employee-form"><UserRoundPlus size={16} aria-hidden="true" />Employee Form</NavLink></div>
        <div className="student"><span className="student-avatar" aria-hidden="true">AJ</span><div><strong>Agnes Joy</strong><span>ASSIGNMENT 02</span></div></div>
      </nav></header>
      <main className="container page-width" id="main" ref={main} tabIndex={-1}>
        <Routes><Route path="/" element={<Dashboard />} /><Route path="/employee-form" element={<EmployeeForm />} /><Route path="*" element={<section className="empty-state panel not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A small detour.</h1><p>Let’s return to the employee directory.</p><Link className="btn btn-primary" to="/">Back to Home <ArrowRight size={16} /></Link></section>} /></Routes>
      </main>
      <footer className="container page-width footer"><span className="footer-wordmark">colleague<span>.</span><span className="footer-copy">People make the difference.</span></span><span>React Assignment 02 <span className="footer-slash">/</span> Agnes Joy</span></footer>
    </div>
  );
}
