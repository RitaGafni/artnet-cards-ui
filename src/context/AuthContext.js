import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email, password) {
    const loginRes = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUserRole('admin');
    return loginRes;
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // async function fetchUserRole(email) {
  //   const url = 'http://localhost:5000/users?email=' + email;
  //   const  {data}  = await axios(url);
  //   return data.role
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // const role = fetchUserRole(user);
      // setCurrentUserRole(role)
      setLoading(false);
      return unsubscribe;
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    currentUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
