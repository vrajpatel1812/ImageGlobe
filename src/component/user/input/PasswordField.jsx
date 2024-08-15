import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  passwordRef,
  label = "password",
  id = "password",
  autoFocus = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      autoFocus={autoFocus}
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      required
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle Password Visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordField.propTypes = {
  passwordRef: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default PasswordField;
