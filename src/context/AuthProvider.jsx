import React from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/Firebase/Firebase.config";

const AuthProvider = ({ children }) => {


  // create account with email password
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login account
  const accountLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const info = {
    createAccount,
    accountLogin
  };
  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
