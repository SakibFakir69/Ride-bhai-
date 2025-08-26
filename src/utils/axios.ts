// frontend/src/utils/axios.ts
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/api/ride-share",
  withCredentials: true, // Send and receive cookies
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log("Request config:", config); // Debug outgoing requests
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response); // Debug incoming responses
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);