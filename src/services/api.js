// FitNex AI — Standalone Showcase Mock API Client
// All services operate directly in localStorage. This client provides graceful fallback.

export const api = {
  get: async (path) => ({ status: 'ok', data: [] }),
  post: async (path, payload) => ({ status: 'ok', data: payload }),
  put: async (path, payload) => ({ status: 'ok', data: payload }),
  delete: async (path) => ({ status: 'ok' }),
};

export default api;
