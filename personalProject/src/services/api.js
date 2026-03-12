// Helper for API calls. Adjust BASE_URL for your environment:
// - Emulator (Android): http://10.0.2.2:8000
// - Local Expo on same machine: http://localhost:8000
// - Physical device: use PC IP like http://192.168.1.100:8000
export const BASE_URL = 'http://localhost/personalProject/backend';

export async function post(path, body) {
  try {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (error) {
    return { success: false, message: 'Network error: ' + error.message };
  }
}

export async function get(path) {
  try {
    const res = await fetch(`${BASE_URL}/${path}`);
    return res.json();
  } catch (error) {
    return { success: false, message: 'Network error: ' + error.message };
  }
}

// Authentication endpoints
export async function login(email, password) {
  return post('login.php', { email, password });
}

export async function register(name, email, password, confirmPassword) {
  return post('registration.php', { name, email, password, confirmPassword });
}