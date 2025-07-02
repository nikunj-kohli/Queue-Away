// API configuration for the current environment
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(name, email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Queue methods
  async getMyQueues() {
    return this.request('/queues/my-queues');
  }

  async joinQueue(businessId, serviceType, notes) {
    return this.request('/queues/join', {
      method: 'POST',
      body: JSON.stringify({ businessId, serviceType, notes }),
    });
  }

  async leaveQueue(queueId) {
    return this.request(`/queues/${queueId}`, {
      method: 'DELETE',
    });
  }

  // Business methods
  async getBusinesses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/business${queryString ? `?${queryString}` : ''}`);
  }

  async getBusiness(id) {
    return this.request(`/business/${id}`);
  }

  async getBusinessQueue(businessId) {
    return this.request(`/queues/business/${businessId}/status`);
  }

  // Messages methods
  async getConversations() {
    return this.request('/messages/conversations');
  }

  async getMessages(otherUserId) {
    return this.request(`/messages/${otherUserId}`);
  }

  async sendMessage(receiverId, content) {
    return this.request('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, content }),
    });
  }
}

export const api = new ApiClient();
export default api;