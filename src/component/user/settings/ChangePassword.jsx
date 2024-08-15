import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import PasswordField from "../input/PasswordField";
import { useRef } from "react";
import SubmitButton from "../input/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { updatePassword } from "firebase/auth";

const ChangePassword = () => {
  const { currentUser, setLoading, setAlert, setModel, model } = useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error("Password do not match.");
      }

      await updatePassword(currentUser, passwordRef.current.value);
      
      setModel({ ...model, isOpen: false });
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your password has been updated",
        timeout: 8000,
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
        <DialogContentText>Please Enter your new Password:</DialogContentText>

        <PasswordField {...{ passwordRef }} />
        <PasswordField
          {...{
            passwordRef: confirmPasswordRef,
            id: "confirmPassword",
            label: "Confirm Password",
          }}
        />
      </DialogContent>

      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangePassword;
