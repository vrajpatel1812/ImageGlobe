import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../../firebase/config";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [model, setModel] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("user status change: ", user);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logout,
    login,
    model,
    setModel,
  };

  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

AuthContext.propTypes = { children: PropTypes.array };

export default AuthContext;
