import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_LOCAL;

axios.defaults.baseURL = BASE_URL;

const api = {
  get: async (url) => {
    return apiCalls("GET", url);
  },
  post: async (url, data) => {
    return apiCalls("POST", url, data);
  },
  put: async (url, data) => {
    return apiCalls("PUT", url, data);
  },
  delete: async (url) => {
    return apiCalls("DELETE", url);
  },
};
async function apiCalls(method, url, data) {
  try {
    const res = await axios({
      headers: {
        Authorization: localStorage.token && `Bearer ${localStorage.token}`,
      },
      method,
      url,
      data,
    });
    return res.data;
  } catch (error) {
    // Expired or invalid token: drop it and send the user to the login screen
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/Login") {
        window.location.href = "/Login";
      }
    }
    throw error;
  }
}

export default api;
