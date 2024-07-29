import { Container } from "@mui/material";
import ImageList from "./component/imageList/ImageList";
import Nav from "./component/Nav";
import Upload from "./component/upload/Upload";

function App() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3rem" }}>
      <Nav />
      <Upload />
      <ImageList />
    </Container>
  );
}

export default App;
