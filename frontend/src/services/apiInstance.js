import axios from "axios";
import toastService from "./toastService";

// Public Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 15000,
    withCredentials: true,
});

// Global response interceptor (optional)
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const errorMessage = error.response?.data?.message || "Something Went Wrong!";
        toastService.error(`API ERROR: ${errorMessage}`);
        return Promise.reject(errorMessage);
    }
);

export default axiosInstance;
