import axios from 'axios';
import { getBearerToken } from './auth';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from './config';
import { useNavigate } from 'react-router-dom';
import { logout } from './auth';

const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    maxBodyLength: Infinity,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getBearerToken();
        if (token) {
            config.headers['Authorization'] = token; // Add auth token to each requewst
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {

            // Logout and send user to login page if auth fails
            logout()
            toast.error('Session expired. Please log in again.');
            window.location.href = '/login'
        }


        if (error.response) {
            const message =
                error.response.data.message || 'Something went wrong. Please try again.';
            toast.error(message);
        } else if (error.request) {
            toast.error('Network error. Please check your connection.');
        } else {
            toast.error('Error: ' + error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
