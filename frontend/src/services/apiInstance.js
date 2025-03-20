import axios from "axios";

// Public Axios instance
const axiosInstancePublic = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_FRONTEND_URL || "http://localhost:8000",
    timeout: 10000,
    withCredentials: true,
});

// Authenticated Axios Instance
const axiosInstanceAuth = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_BACKEND_URL,
    withCredentials: true,
});

export { axiosInstanceAuth, axiosInstancePublic };
