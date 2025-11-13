// API Configuration - Auto-detect based on environment
const API_CONFIG = {
  // Determine API base URL
  getApiUrl: () => {
    // In production and development, use relative path
    // Nginx will proxy /api/* to backend
    // For direct backend calls, use window.location.origin/api
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Local development - direct backend on port 5000
      return 'http://localhost:5000';
    }
    
    // Production - use same origin (Nginx proxy)
    return window.location.origin;
  },

  // Get full API endpoint
  endpoint: (path) => {
    const baseUrl = API_CONFIG.getApiUrl();
    return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
  },

  // Quick shortcuts
  protected: () => API_CONFIG.endpoint('/protected'),
  auth: (path) => API_CONFIG.endpoint(`/auth${path.startsWith('/') ? path : '/' + path}`),
  api: (path) => API_CONFIG.endpoint(`/api${path.startsWith('/') ? path : '/' + path}`),
};

// For backward compatibility
const API_BASE_URL = API_CONFIG.getApiUrl();
