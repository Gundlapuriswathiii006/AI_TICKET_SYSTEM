const metrics = [
  { label: 'Tickets Today', value: '24' },
  { label: 'Resolved', value: '18' },
  { label: 'Escalated', value: '4' }
];

const weeklyData = [35, 48, 42, 56, 60, 70, 64];

function Analytics() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Analytics</h2>
        <p>See team performance and ticket trends at a glance.</p>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <div>{metric.label}</div>
              <h3>{metric.value}</h3>
            </div>
          ))}
        </div>

        <div className="bar-chart" aria-label="weekly ticket volume">
          {weeklyData.map((value, index) => (
            <div key={index} className="bar" style={{ height: `${value}px` }}></div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Analytics;
