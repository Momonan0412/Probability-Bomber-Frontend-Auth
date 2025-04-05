// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: `http://127.0.0.1:5001/fir-crud-restapi-6a058/us-central1/app/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
  },
});

export default api;