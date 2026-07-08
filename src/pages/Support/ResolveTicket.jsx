
function ResolveTicket() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Resolve Ticket</h2>
        <p>Close a ticket with a clear summary and next steps.</p>
        <div className="form-grid">
          <input placeholder="Ticket ID" />
          <input placeholder="Customer Name" />
          <textarea placeholder="Resolution notes" rows="4"></textarea>
          <select>
            <option>Resolved</option>
            <option>Pending Review</option>
            <option>Needs Follow-up</option>
          </select>
          <button className="secondary-btn">Save Resolution</button>
        </div>
      </section>
    </div>
  );
}

export default ResolveTicket;
