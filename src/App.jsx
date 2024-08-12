import { Container } from "@mui/material";
import ImageList from "./component/imageList/ImageList";
import Nav from "./component/Nav";
import Upload from "./component/upload/Upload";
import AuthContext from "./component/context/AuthContext";
import Model from "./component/Model";

function App() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3rem" }}>
      <AuthContext>
        <Model />
        <Nav />
        <Upload />
        <ImageList />
      </AuthContext>
    </Container>
  );
}

export default App;
