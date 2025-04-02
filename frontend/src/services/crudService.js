import axiosInstance from "./apiInstance";

/**
 * Generic API request handler to avoid repetitive code.
 * @param {string} method - HTTP method (get, post, put, delete, patch)
 * @param {string} url - API endpoint
 * @param {Object} [data={}] - Request body (for POST, PUT, PATCH)
 * @param {Object} [config={}] - Additional Axios config (headers, params, etc.)
 * @returns {Promise<any>} - API response data
 **/
const handleRequest = async (method, url, data = {}, config = {}) => {
    try {
        const response = await axiosInstance({ method, url, data, ...config });
        return response.data;
    } catch (error) {
        console.error(`API Error [${method.toUpperCase()} ${url}]:`, error);
        throw error;
    }
};

// CRUD Service
const crudService = {
    get: (url, params = {}, headers = {}) => handleRequest("get", url, {}, { params, headers }),
    post: (url, data = {}, contentType = "application/json", moreHeaders = {}) => handleRequest("post", url, data, { headers: { "Content-Type": contentType, ...moreHeaders } }),
    put: (url, data = {}, contentType = "application/json", moreHeaders = {}) => handleRequest("put", url, data, { headers: { "Content-Type": contentType, ...moreHeaders } }),
    patch: (url, data = {}, contentType = "application/json", moreHeaders = {}) => handleRequest("patch", url, data, { headers: { "Content-Type": contentType, ...moreHeaders } }),
    delete: (url, headers = {}) => handleRequest("delete", url, {}, { headers }),
};

export default crudService;
