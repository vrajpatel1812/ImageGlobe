import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

export default function ImageLists() {
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <ImageList
        variant="quilted"
        cols={4}
        rowHeight={200}
        gap={2}
        sx={{ overflow: "hidden" }}
      >
        {itemData.map((item, index) => {
          const { rows, cols } = pattern[index % pattern.length];
          return (
            <ImageListItem
              key={item.img}
              cols={cols}
              rows={rows}
              sx={{
                overflow: "hidden",
                display: "block",
              }}
            >
              <LightGallery
                speed={500}
                plugins={[lgZoom, lgFullscreen]}
                elementClassNames="custom-class"
                counter={false}
                pager={false}
              >
                <a href={item.img} data-sub-html={`<h4>${item.title}</h4>`}>
                  <img
                    {...srcset(item.img, 200, rows, cols)}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </a>
              </LightGallery>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const pattern = [
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 2, cols: 2 },
  { rows: 1, cols: 2 },
];
