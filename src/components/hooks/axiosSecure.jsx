import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { getAuth } from 'firebase/auth';


// creating axios secure instance 
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
});

// implementing axios interceptor
axiosSecure.interceptors.request.use( async config => {
    const user = await getAuth();
    const token = user.currentUser.accessToken;
    if (user) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosSecure;
