const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

console.log('API_URL:', API_URL); // Para debug

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  console.log("fetch(" + `${API_URL}${endpoint}` + ")")

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}

export const api = {
  get: (endpoint: string) => apiFetch(endpoint),
  
  post: <T>(endpoint: string, data: T) => apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  put: <T>(endpoint: string, data: T) => apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  delete: (endpoint: string) => apiFetch(endpoint, {
    method: 'DELETE'
  })
};

export default api;