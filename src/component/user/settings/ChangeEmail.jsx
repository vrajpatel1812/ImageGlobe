import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useRef } from "react";
import SubmitButton from "../input/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import EmailField from "../input/EmailField";
import { updateEmail } from "firebase/auth";

const ChangeEmail = () => {
  const { currentUser, setLoading, setAlert, setModel, model } = useAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateEmail(currentUser, emailRef.current.value);

      setModel({ ...model, isOpen: false });
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your email has been updated",
        timeout: 5000,
        location: "main",
      });
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

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please Enter your new Email:</DialogContentText>

        <EmailField {...{ emailRef, defaultValue: currentUser?.email }} />
      </DialogContent>

      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangeEmail;
