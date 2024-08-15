import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Send } from "@mui/icons-material";
import deleteAccountFile from "../../../firebase/deleteAccountFile";
import { deleteUser } from "firebase/auth";

const DeleteAccount = () => {
  const { currentUser, setLoading, setAlert, setModel, model } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await deleteAccountFile("gallery", currentUser);
      await deleteUser(currentUser);

      setModel({ ...model, isOpen: false });
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your account has been deleted",
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
        <DialogContentText>
          Are you sure you want to delete your account? This action will delete
          all of your files and records.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" endIcon={<Send />} type="submit">
          Confirm
        </Button>
      </DialogActions>
    </form>
  );
};

export default DeleteAccount;
