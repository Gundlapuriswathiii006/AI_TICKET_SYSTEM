// Local auth — works without a backend by storing users in localStorage.

const USERS_KEY = 'supportpilot_users';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeToken(user) {
  // Simple fake JWT-shaped token (not cryptographically secure — local only)
  const payload = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
  return `local.${payload}.sig`;
}

export const authService = {
  register: async (userData) => {
    const users = getUsers();
    if (users.find((u) => u.email === userData.email)) {
      const err = new Error('Email already registered.');
      err.response = { data: { message: 'Email already registered. Please sign in instead.' } };
      throw err;
    }
    const user = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,   // local only — no real security needed
      role: userData.role || 'employee',
    };
    saveUsers([...users, user]);
    const { password: _p, ...safeUser } = user;
    return { user: safeUser, token: makeToken(safeUser) };
  },

  login: async ({ email, password }) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      const err = new Error('Invalid credentials.');
      err.response = { data: { message: 'Invalid email or password.' } };
      throw err;
    }
    const { password: _p, ...safeUser } = user;
    return { user: safeUser, token: makeToken(safeUser) };
  },

  getCurrentUser: async () => {
    // Read the stored user directly — no API call needed
    const stored = localStorage.getItem('supportpilot_user');
    if (!stored) throw new Error('No session');
    return JSON.parse(stored);
  },

  forgotPassword: async (_email) => {
    // No-op locally
    return { message: 'If that email exists, a reset link has been sent.' };
  },
};
