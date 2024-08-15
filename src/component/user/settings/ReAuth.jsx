import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import PasswordField from "../input/PasswordField";
import { useRef } from "react";
import SubmitButton from "../input/SubmitButton";
import { useAuth } from "../../context/AuthContext";

import PropTypes from "prop-types";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";

const ReAuth = ({ action }) => {
  const { currentUser, setLoading, setAlert, setModel, model } = useAuth();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const credential = EmailAuthProvider.credential(
      currentUser?.email,
      passwordRef.current.value
    );

    try {
      await reauthenticateWithCredential(currentUser, credential);

      switch (action) {
        case "changePassword":
          setModel({
            ...model,
            title: "Change Password",
            content: <ChangePassword />,
          });
          break;
        case "changeEmail":
          setModel({
            ...model,
            title: "Update Email",
            content: <ChangeEmail />,
          });
          break;
        case "deleteAccount":
          setModel({
            ...model,
            title: "Delete Account",
            content: <DeleteAccount />,
          });
          break;
        default:
          console.error("Unknown action:", action);
          throw new Error("No matching actions");
      }
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
        <DialogContentText>
          Please Enter your current Password:
        </DialogContentText>

        <PasswordField {...{ passwordRef }} />
      </DialogContent>

      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

ReAuth.propTypes = {
  action: PropTypes.string,
};

export default ReAuth;
