import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import EmailField from "./input/EmailField";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import SubmitButton from "./input/SubmitButton";

const ResetPassword = () => {
  const { setLoading, setAlert, setModel, model, resetPassword } = useAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(emailRef.current.value);
      setModel({ ...model, isOpen: false });

      setAlert({
        isAlert: true,
        severity: "success",
        message: "reset link has been sent to your email inbox",
        timeout: 8000,
        location: "main",
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 8000,
        location: "model",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText></DialogContentText>
        Please enter your email address:
        <EmailField {...{ emailRef }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ResetPassword;
