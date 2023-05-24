import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:3333",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
