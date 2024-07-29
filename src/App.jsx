import "./App.css";
import ImageList from "./component/imageList/ImageList";
import Nav from "./component/Nav";
import Upload from "./component/upload/Upload";

function App() {
  return (
    <>
      <Nav />
      <Upload />
      <ImageList />
    </>
  );
}

export default App;
