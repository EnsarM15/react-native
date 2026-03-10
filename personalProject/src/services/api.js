// Helper for API calls. Adjust BASE_URL for your environment:
// - Emulator (Android): http://10.0.2.2:8000
// - Local Expo on same machine: http://localhost:8000
// - Physical device: use PC IP like http://192.168.1.100:8000
export const BASE_URL = 'http://localhost:8000';

export async function post(path, body) {
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function get(path) {
  const res = await fetch(`${BASE_URL}/${path}`);
  return res.json();
}