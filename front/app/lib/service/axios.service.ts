import axios from 'axios';
import {redirectToLogin} from "@/app/actions";

const axiosService = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
        'Content-Type': 'application/json'
    }
});

function getAuthToken(): String | null {
    return localStorage.getItem('accessToken');
}

axiosService.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosService.interceptors.response.use(response => {
    return response;
}, (error) => {
    if (error.response.status === 403) {
        redirectToLogin();
    }
    return Promise.reject(error);
});

export default axiosService;
