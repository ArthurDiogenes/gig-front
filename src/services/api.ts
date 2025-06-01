import axios from "axios";
import { API_URL } from "../config";

const baseURL = `${API_URL}` || "http://localhost:3000";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
