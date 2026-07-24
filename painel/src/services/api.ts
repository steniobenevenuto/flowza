import axios from "axios";

const api = axios.create({
  baseURL: "https://flowza-production-9b03.up.railway.app",
});

export default api;