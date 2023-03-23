import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://fastrack-backend.onrender.com/api",
});

export default axiosInstance