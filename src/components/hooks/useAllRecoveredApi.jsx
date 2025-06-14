import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAllRecoveredApi = () => {
    const AxiosSecure = useAxiosSecure();

    const allRecoveredPromise = () => {
        return AxiosSecure.get('/allRecovered').then(response => response.data)
    }
    return {
        allRecoveredPromise
    }
};

export default useAllRecoveredApi;