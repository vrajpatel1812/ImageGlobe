import { Box, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgresswithLabel from "./CircularProgresswithLabel";
import { CheckCircleOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../../../firebase/uploadFileProgress";
import addDocument from "../../../firebase/addDocument";

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(100);
  const [imageURL, setImageURL] = useState(null);
  const currentUser = { uid: "userId" };

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      try {
        const url = await uploadFileProgress(
          file,
          `gallery/${currentUser.uid}`,
          imageName,
          setProgress
        );

        const galleryDoc = {
          imageURL: url,
          uid: currentUser.uid,
          uEmail: "test@test.com",
          uName: "john",
          uPhoto: "",
        };

        await addDocument("gallery", galleryDoc, imageName);
        console.log(url);
        setImageURL(null);
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };

    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />

        <Box sx={backdrop}>
          {progress < 100 ? (
            <CircularProgresswithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

ProgressItem.propTypes = { file: PropTypes.object };

export default ProgressItem;

const backdrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,.5)",
};
