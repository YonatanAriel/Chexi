import axios from 'axios'

axios.defaults.baseURL = "http://localhost:1000/"
//store it in env?


//This is a generic API function. Here you can make axios calls by simply writing api.post or the method of your choosing
//Be sure to check which parameters each method requests 

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
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      },
      method,
      url,
      data
    });
    return res.data;
  } catch (error) {
    console.log (error)
    throw error;
  }
}


export const setToken = (token) => {
  // when you do logout pass the parameter as an empty string
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` //AUTH_TOKEN
  
}

export default api;