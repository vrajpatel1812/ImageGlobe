import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import { Close } from "@mui/icons-material";

const Model = () => {
  const { model, setModel } = useAuth();

  const handleClose = () => {
    setModel({ ...model, isOpen: false });
  };

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
      {model.content}
    </Dialog>
  );
};

export default Model;
