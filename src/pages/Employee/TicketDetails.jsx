import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ticketService } from '../../services/ticketService';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ticketService.getAllTickets()
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((t) => String(t.id) === String(id));
          setTicket(found || null);
          if (!found) setError('Ticket not found.');
        } else {
          setError('Could not load ticket.');
        }
      })
      .catch(() => setError('Could not load ticket. The backend may be unavailable.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>Loading…</div>
    );
  }

  if (error || !ticket) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem',
        }}
      >
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {error || 'Ticket not found.'}
        </p>
        <button
          className="sp-btn sp-btn-secondary sp-btn-sm"
          onClick={() => navigate('/employee/tickets')}
        >
          ← Back to My Tickets
        </button>
      </div>
    );
  }

  const fields = [
    { label: 'Ticket ID', value: `#${ticket.id}` },
    { label: 'Title', value: ticket.title || ticket.subject },
    { label: 'Category', value: ticket.category },
    { label: 'Status', value: ticket.status },
    { label: 'Priority', value: ticket.priority },
    { label: 'Tags', value: ticket.tags },
    { label: 'Created At', value: ticket.createdAt },
    { label: 'Description', value: ticket.description },
  ].filter(({ value }) => value !== undefined && value !== null && value !== '');

  return (
    <div>
      <button
        className="sp-btn sp-btn-secondary sp-btn-sm"
        onClick={() => navigate('/employee/tickets')}
        style={{ marginBottom: '1.25rem' }}
      >
        ← Back to My Tickets
      </button>

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.5px',
            marginBottom: '1.5rem',
          }}
        >
          Ticket Details
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {fields.map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
                {label}
              </div>
              <div style={{ color: 'var(--text)', fontSize: '0.95rem', wordBreak: 'break-word' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
