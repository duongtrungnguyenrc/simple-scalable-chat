import axios from "axios";

import { API_URL } from "@app/common";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
