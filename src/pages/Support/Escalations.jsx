const escalations = [
  { id: 'E-201', customer: 'Nikhil', reason: 'Payment failed twice', priority: 'High' },
  { id: 'E-202', customer: 'Sara', reason: 'Service outage', priority: 'Urgent' }
];

function Escalations() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Escalations</h2>
        <p>Important tickets that need immediate attention.</p>
        <div className="ticket-list">
          {escalations.map((item) => (
            <div key={item.id} className="ticket-item">
              <div>
                <strong>{item.id}</strong>
                <div>{item.customer}</div>
                <div>{item.reason}</div>
              </div>
              <span className="badge progress">{item.priority}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Escalations;
