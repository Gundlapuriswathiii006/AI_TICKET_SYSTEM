import React, { useEffect, useState } from 'react';
import { ticketService } from '../../services/ticketService';
import AnalyticsChart from '../../components/AnalyticsChart';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

function Reports() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [range, setRange] = useState('7d');

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await ticketService.getAllTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load reports', err);
      setError('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [range]);

  if (loading) {
    return <Loader text="Loading reports..." />;
  }

  // Build chart data from ticket list (mock/localStorage source)
  const countBy = (key) => {
    const counts = {};
    tickets.forEach((t) => {
      const value = t[key] || 'Unknown';
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  };

  const ticketsByStatus = countBy('status');
  const ticketsByPriority = countBy('priority');
  const ticketsByCategory = countBy('category');

  return (
    <div className="admin-reports">
      <div className="section-header">
        <h1>Reports</h1>
        <div className="range-filters">
          <Button variant={range === '7d' ? 'primary' : 'secondary'} onClick={() => setRange('7d')}>7 Days</Button>
          <Button variant={range === '30d' ? 'primary' : 'secondary'} onClick={() => setRange('30d')}>30 Days</Button>
          <Button variant={range === '90d' ? 'primary' : 'secondary'} onClick={() => setRange('90d')}>90 Days</Button>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="reports-grid">
        <AnalyticsChart title="Tickets by Status" data={ticketsByStatus} />
        <AnalyticsChart title="Tickets by Priority" data={ticketsByPriority} />
        <AnalyticsChart title="Tickets by Category" data={ticketsByCategory} />
      </div>
    </div>
  );
}

export default Reports;