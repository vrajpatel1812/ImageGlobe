import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "info",
    message: "",
    timeout: null,
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
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
    loginWithGoogle,
    alert,
    setAlert,
    loading,
    setLoading,
  };

  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

AuthContext.propTypes = { children: PropTypes.array };

export default AuthContext;
