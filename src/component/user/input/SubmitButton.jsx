import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";

const SubmitButton = () => {
  return (
    <Button variant="contained" endIcon={<Send />} type="submit">
      Submit
    </Button>
  );
};

export default SubmitButton;
