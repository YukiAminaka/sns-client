import axios from "axios";

const apiClient = axios.create({
  //localhostで立ち上げるときはこのURL
  baseURL: "http://localhost:10000/api",
  //baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
