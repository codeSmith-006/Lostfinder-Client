import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Auth/Firebase/Firebase.config";
import { setAccessToken } from "../components/hooks/axiosSecure";

const AuthProvider = ({ children }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create account with email password
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login account
  const accountLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle logout
  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  // monitor current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        if (token) {
          setAccessToken(token)
        } else {
          setAccessToken(null)
        }
        setPhotoURL(user.photoURL);
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  const info = {
    loading,
    createAccount,
    accountLogin,
    currentUser,
    logout,
    photoURL,
    setPhotoURL,
  };
  return <AuthContext value={info}>{!loading && children}</AuthContext>;
};

export default AuthProvider;
