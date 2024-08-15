import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Fragment, useState } from "react";
import { Delete, Download, MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";
import deleteDocument from "../../firebase/deleteDocument";
import deleteFile from "../../firebase/deleteFile";
import { useAuth } from "../context/AuthContext";

const Options = ({ imageId, uid, imageURL }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, setAlert } = useAuth();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageURL);
      const data = await response.blob();
      const blob = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blob;
      link.download = imageId;
      link.click();
      URL.revokeObjectURL(blob);
      link.remove();
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 8000,
        location: "main",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument("gallery", imageId);
      await deleteFile(`gallery/${currentUser.uid}/${imageId}`);
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 8000,
        location: "main",
      });
    }
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download />
          </ListItemIcon>
          Download
        </MenuItem>

        {currentUser?.uid === uid && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

Options.propTypes = {
  imageId: PropTypes.string,
  uid: PropTypes.string,
  imageURL: PropTypes.string,
};

export default Options;
