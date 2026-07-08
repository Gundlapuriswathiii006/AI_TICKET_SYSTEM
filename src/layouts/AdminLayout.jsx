import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/tickets', label: 'Ticket Monitoring' },
  { to: '/admin/knowledge-base', label: 'Knowledge Base' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'A';
  const firstName = user?.name ? user.name.split(' ')[0] : 'Admin';

  return (
    <div className="sp-app-shell">
      <aside className="sp-sidebar">
        <div className="sp-sidebar-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workspace</span>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>ADMIN</span>
        </div>
        <nav className="sp-sidebar-nav">
          {adminLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => 'sp-sidebar-link' + (isActive ? ' active' : '')}>{label}</NavLink>
          ))}
        </nav>
      </aside>

      <header className="sp-navbar">
        <div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>SupportPilot</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '1px' }}>AI-powered support operations</div>
        </div>
        <div className="sp-navbar-right">
          <div className="sp-user-chip">
            <div className="sp-user-avatar">{initials}</div>
            <span>{firstName}</span>
          </div>
          <button className="sp-btn sp-btn-secondary sp-btn-sm" onClick={() => navigate('/admin')}>Dashboard</button>
          <button className="sp-btn sp-btn-sm" onClick={handleLogout} style={{ background: 'var(--cyan)', color: '#fff', border: 'none' }}>Logout</button>
        </div>
      </header>

      <main className="sp-main"><Outlet /></main>
    </div>
  );
}
