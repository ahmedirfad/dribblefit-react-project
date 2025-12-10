// In your Api/Axios.jsx file
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Make sure this matches your JSON Server port
  timeout: 10000,
});

export default api;