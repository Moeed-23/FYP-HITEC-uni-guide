import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2500/api", // Make sure this matches your backend URL
});

export default API;
