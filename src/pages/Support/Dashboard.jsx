const summaryCards = [
  { title: 'Open Tickets', value: '12', note: 'Need quick response' },
  { title: 'Avg. Response Time', value: '8m', note: 'Improved this week' },
  { title: 'Customer Satisfaction', value: '94%', note: 'Excellent rating' }
];

function Dashboard() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Dashboard</h2>
        <p>Overview of your support operations and current performance.</p>
        <div className="metric-grid">
          {summaryCards.map((card) => (
            <div key={card.title} className="metric">
              <div>{card.title}</div>
              <h3>{card.value}</h3>
              <small>{card.note}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
