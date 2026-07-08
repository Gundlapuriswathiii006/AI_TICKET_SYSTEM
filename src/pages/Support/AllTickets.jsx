const tickets = [
  { id: 'T-1001', customer: 'Asha', issue: 'Login problem', status: 'Open' },
  { id: 'T-1002', customer: 'Ravi', issue: 'Billing issue', status: 'In Progress' },
  { id: 'T-1003', customer: 'Mina', issue: 'Reset password', status: 'Resolved' }
];

function AllTickets() {
  return (
    <div className="grid">
      <section className="card">
        <h2>All Tickets</h2>
        <p>Track every incoming request in one simple place.</p>
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div>
                <strong>{ticket.id}</strong>
                <div>{ticket.customer}</div>
                <div>{ticket.issue}</div>
              </div>
              <span className={`badge ${ticket.status === 'Resolved' ? 'resolved' : ticket.status === 'In Progress' ? 'progress' : 'open'}`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AllTickets;
