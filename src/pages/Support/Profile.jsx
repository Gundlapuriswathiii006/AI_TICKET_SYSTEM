function Profile() {
  return (
    <div className="grid">
      <section className="card">
        <h2>Profile</h2>
        <p>Manage agent information and support preferences.</p>
        <div className="form-grid">
          <input placeholder="Full Name" defaultValue="Aarav Kumar" />
          <input placeholder="Email" defaultValue="aarav@support.ai" />
          <input placeholder="Role" defaultValue="Support Agent" />
          <textarea rows="4" placeholder="About you">Focused on fast ticket resolution and customer satisfaction.</textarea>
          <button className="secondary-btn">Save Profile</button>
        </div>
      </section>
    </div>
  );
}

export default Profile;
