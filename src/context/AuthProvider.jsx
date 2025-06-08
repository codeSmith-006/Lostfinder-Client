import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Auth/Firebase/Firebase.config";

const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // create account with email password
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login account
  const accountLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // handle logout
  const logout = () => {
    setLoading(false)
    return signOut(auth);
  }

  // monitor current user
  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
        setCurrentUser(user)
      }
      else {
        setCurrentUser(null)
      }
    })
    setLoading(false)
    return () => unsubscribe();
  }, [])


  const info = {
    loading,
    createAccount,
    accountLogin,
    currentUser,
    logout
  };
  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
