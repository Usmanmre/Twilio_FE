// API Configuration
export const API_CONFIG = {
  // Replace this with your deployed backend URL
  // You can also set this via environment variable REACT_APP_API_URL
  BASE_URL: process.env.REACT_APP_API_URL || 'twilio-be-2jui-ik95c02a0-usmanmres-projects.vercel.app',
  
  // API endpoints
  ENDPOINTS: {
    CALLS: '/calls',
  },
  
  // Default query parameters
  DEFAULT_PARAMS: {
    page: 1,
    limit: 20,
  },
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(API_CONFIG.BASE_URL + endpoint);
  
  // Add default params
  Object.entries(API_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  
  // Add custom params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });
  }
  
  return url.toString();
}; 