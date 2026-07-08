// Local ticket store — works without a backend using localStorage.

const TICKETS_KEY = 'supportpilot_tickets';

function getStoredTickets() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export const ticketService = {
  getAllTickets: async () => {
    const user = JSON.parse(localStorage.getItem('supportpilot_user') || 'null');
    const all = getStoredTickets();
    // Employees only see their own tickets
    if (user?.role === 'employee') {
      return all.filter((t) => t.userId === user.id);
    }
    return all;
  },

  createTicket: async (ticketData) => {
    const user = JSON.parse(localStorage.getItem('supportpilot_user') || 'null');
    const tickets = getStoredTickets();
    const ticket = {
      id: Date.now().toString(),
      userId: user?.id,
      title: ticketData.title,
      subject: ticketData.title,
      category: ticketData.category,
      description: ticketData.description,
      tags: ticketData.tags || '',
      priority: 'Medium',
      status: 'open',
      createdAt: new Date().toLocaleDateString(),
    };
    saveTickets([...tickets, ticket]);
    return ticket;
  },

  resolveTicket: async (ticketId, resolutionData) => {
    const tickets = getStoredTickets();
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'resolved', ...resolutionData } : t
    );
    saveTickets(updated);
    return updated.find((t) => t.id === ticketId);
  },
};
