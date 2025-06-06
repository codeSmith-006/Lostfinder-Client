import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {

    const test = "Hello";

    const info = {
        test,
    }
    return <AuthContext value={info}>{children}</AuthContext>
};

export default AuthProvider;