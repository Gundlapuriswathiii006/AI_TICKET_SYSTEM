import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navLinks = [
  { to: '/employee', label: 'Dashboard', end: true },
  { to: '/employee/tickets/new', label: 'Create Ticket' },
  { to: '/employee/tickets', label: 'My Tickets' },
];

export default function EmployeeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="sp-app-shell">
      {/* ── Sidebar ── */}
      <aside className="sp-sidebar">
        <div className="sp-sidebar-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Workspace
          </span>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
            EMPLOYEE
          </span>
        </div>

        <nav className="sp-sidebar-nav">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                'sp-sidebar-link' + (isActive ? ' active' : '')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Navbar ── */}
      <header className="sp-navbar">
        <div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            SupportPilot
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '1px' }}>
            AI-powered support operations
          </div>
        </div>

        <div className="sp-navbar-right">
          <div className="sp-user-chip">
            <div className="sp-user-avatar">{initials}</div>
            <span>{firstName}</span>
          </div>
          <button
            className="sp-btn sp-btn-secondary sp-btn-sm"
            onClick={() => navigate('/employee')}
          >
            Dashboard
          </button>
          <button
            className="sp-btn sp-btn-sm"
            onClick={handleLogout}
            style={{ background: 'var(--cyan)', color: '#fff', border: 'none' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="sp-main">
        <Outlet />
      </main>
    </div>
  );
}
