import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const EmailField = ({ emailRef, defaultValue = "" }) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="standard"
      id="email"
      label="Email Address"
      type="email"
      fullWidth
      required
      inputRef={emailRef}
      defaultValue={defaultValue}
    />
  );
};

EmailField.propTypes = {
  emailRef: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default EmailField;
