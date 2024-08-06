import PropTypes from "prop-types";
import { ImageList } from "@mui/material";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files }) => {
  return (
    <ImageList rowHeight={200} cols={4}>
      {files.map((file, index) => (
        <ProgressItem key={index} file={file} />
      ))}
    </ImageList>
  );
};

ProgressList.propTypes = {
  files: PropTypes.array,
};

export default ProgressList;
