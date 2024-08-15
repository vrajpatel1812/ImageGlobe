import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import SubmitButton from "./input/SubmitButton";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "../../firebase/uploadFile";
import { updateProfile } from "firebase/auth";
import deleteFile from "../../firebase/deleteFile";
import updateUserRecords from "../../firebase/updateUserRecords";
import CropEasy from "../crop/CropEasy";
import { Crop } from "@mui/icons-material";

const Profile = () => {
  const { currentUser, setLoading, setAlert, model, setModel } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);
  const [openCrop, setOpenCrop] = useState(false);

  // const isPasswordProvider =
  // currentUser?.providerData[0].providerId === "password";

  useEffect(() => {
    if (openCrop) {
      setModel({ ...model, title: "Crop Profile Photo" });
    } else {
      setModel({ ...model, title: "Update Profile" });
    }
  }, [openCrop]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let userObj = { displayName: name };
    let imagesObj = { uName: name };

    try {
      if (file) {
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(
          file,
          `profile/${currentUser?.uid}/${imageName}`
        );

        if (currentUser?.photoURL) {
          const prevImage = currentUser?.photoURL
            ?.split(`${currentUser?.uid}%2F`)[1]
            .split("?")[0];
          if (prevImage) {
            try {
              await deleteFile(`profile/${currentUser?.uid}/${prevImage}`);
            } catch (error) {
              console.log(error);
            }
          }
        }

        userObj = { ...userObj, photoURL: url };
        imagesObj = { ...imagesObj, uPhoto: url };
      }

      await updateProfile(currentUser, userObj);
      await updateUserRecords("gallery", currentUser?.uid, imagesObj);

      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your Profile has been updated successfully",
        timeout: 3000,
        location: "model",
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "model",
      });
    }

    setLoading(false);
  };

  return !openCrop ? (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          You can update your profile by updating these fields:
        </DialogContentText>

        <TextField
          autoFocus
          margin="normal"
          type="text"
          inputProps={{ minLength: 2 }}
          fullWidth
          variant="standard"
          value={name || ""}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>

          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default Profile;
