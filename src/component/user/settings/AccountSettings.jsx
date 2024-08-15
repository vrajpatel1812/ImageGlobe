import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ReAuth from "./ReAuth";
import { GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";

const AccountSettings = () => {
  const { currentUser, setAlert, model, setModel } = useAuth();

  const isPasswordProvider =
    currentUser?.providerData[0].providerId === "password";

  const handleAction = async (action) => {
    if (isPasswordProvider) {
      setModel({
        ...model,
        title: "Re-Login",
        content: <ReAuth {...{ action }} />,
      });
    } else {
      try {
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());

        switch (action) {
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
    }
  };

  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
          For security reasons you need to provide your creadials to do any of
          these actions:
        </DialogContentText>

        <DialogActions sx={{ flexDirection: "column", gap: 2, my: 2 }}>
          {isPasswordProvider && (
            <Button onClick={() => handleAction("changePassword")}>
              Change Password
            </Button>
          )}
          <Button onClick={() => handleAction("changeEmail")}>
            Change Email
          </Button>
          <Button onClick={() => handleAction("deleteAccount")}>
            Delete Account
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default AccountSettings;
