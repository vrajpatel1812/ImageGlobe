import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import EmailField from "./input/EmailField";
import { useEffect, useRef, useState } from "react";
import PasswordField from "./input/PasswordField";
import SubmitButton from "./input/SubmitButton";
import { Google } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const conformPasswordRef = useRef();

  const [isRegister, setIsRegister] = useState(false);
  const {
    model,
    setModel,
    signUp,
    login,
    loginWithGoogle,
    setAlert,
    setLoading,
  } = useAuth();

  useEffect(() => {
    if (isRegister) {
      setModel({ ...model, title: "Register" });
    } else {
      setModel({ ...model, title: "Login" });
    }
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isRegister) {
      try {
        const conformPassword = conformPasswordRef.current.value;

        if (conformPassword !== password) {
          throw new Error("Password don't match");
        }

        await signUp(email, password);
        setModel({ ...model, isOpen: false });
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 5000,
          location: "model",
        });
      }
    } else {
      try {
        await login(email, password);
        setModel({ ...model, isOpen: false });
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 5000,
          location: "model",
        });
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setModel({ ...model, isOpen: false });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "model",
      });
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email and password here:
          </DialogContentText>
          <EmailField {...{ emailRef }} />
          <PasswordField {...{ passwordRef, autoFocus: false }} />
          {isRegister && (
            <PasswordField
              {...{
                passwordRef: conformPasswordRef,
                label: "Conform Password",
                id: "conformPassword",
                autoFocus: false,
              }}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: "19px" }}>
          <Button size="small">Forgot Password</Button>
          <SubmitButton />
        </DialogActions>
      </form>

      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {isRegister
          ? "Do you have an account? Sign In now"
          : "Don't you have account? create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </Button>
      </DialogActions>

      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </DialogActions>
    </>
  );
};

export default Login;
