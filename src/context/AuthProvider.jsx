import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
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
    return () => unsubscribe();
  }, [])

  const info = {
    loading,
    createAccount,
    accountLogin,
    currentUser
  };
  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
