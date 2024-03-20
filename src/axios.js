import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

axios.defaults.baseURL = "http://localhost:8000";

// // Set the bearer token
const token = Cookies.get('_user');

// If token is available, set it in the Authorization header
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    // Handle case where token is not available
    console.error("Bearer token not found in localStorage!");
}