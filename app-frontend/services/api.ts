import axios from "axios";

const api = axios.create({
  baseURL: "https://infra.devskills.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
