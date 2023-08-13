import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
axios.defaults.baseURL = "https://chexi-server.onrender.com"

const api = {
  get: async (url) => {
    return apiCalls('GET', url);
  },
  post: async (url, data) => {
    return apiCalls('POST', url, data);
  },
  put: async (url, data) => {
    return apiCalls('PUT', url, data);
  },
  delete: async (url) => {
    return apiCalls('DELETE', url);
  },
};
async function apiCalls(method, url, data) {
  try {
    const res = await axios({
      headers: {
        'Authorization': localStorage.token && `Bearer ${localStorage.token}` 
      },
      method,
      url,
      data
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}


export default api;