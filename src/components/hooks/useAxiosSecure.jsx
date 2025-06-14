import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';


// creating instance 
const api = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {currentUser} = use(AuthContext);

    api.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${currentUser?.accessToken}`;
        return config
    })
    return api
};

export default useAxiosSecure;