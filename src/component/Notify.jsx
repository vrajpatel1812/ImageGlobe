import { useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Notify = () => {
  const alertRef = useRef();
  const {
    alert: { isAlert, severity, message, timeout },
    setAlert,
  } = useAuth();

  useEffect(() => {
    alertRef.current.scrollIntoView({
      bahavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    let timer;
    if (timeout) {
      timer = setTimeout(() => {
        setAlert({ ...alert, isAlert: false });
      }, timeout);
    }

    return () => clearTimeout(timer);
  });

  return (
    <Box sx={{ mb: 2 }} ref={alertRef}>
      <Collapse in={isAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="Close"
              size="small"
              onClick={() => setAlert({ ...alert, isAlert: false })}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Notify;
