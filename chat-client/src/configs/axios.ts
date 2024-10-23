import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/api";

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
