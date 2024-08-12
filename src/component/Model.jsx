import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import { Close } from "@mui/icons-material";
import Notify from "./Notify";
import { useEffect } from "react";

const Model = () => {
  const {
    model,
    setModel,
    alert: { location, isAlert },
    setAlert,
  } = useAuth();

  const handleClose = () => {
    setModel({ ...model, isOpen: false });
  };

  useEffect(() => {
    if (model.isOpen === false) {
      if (isAlert && location === "model") {
        setAlert({ ...alert, isAlert: false });
      }
    }
  }, [model?.isOpen]);

  return (
    <Dialog open={model.isOpen} onClose={handleClose}>
      <DialogTitle>
        {model.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "grey",
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {location === "model" && <Notify />}
      {model.content}
    </Dialog>
  );
};

export default Model;
