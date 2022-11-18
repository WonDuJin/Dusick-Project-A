import axios from 'axios';

const axiosSet = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json ',
  },
  withCredentials: true,
});

export default axiosSet;
