import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { DateTime } from "luxon";
import Options from "./Options";
import useFireStore from "../../firebase/useFireStore";

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

export default function ImageLists() {
  const { documents } = useFireStore("gallery");

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Gallery withDownloadButton={true}>
        <ImageList
          variant="quilted"
          cols={4}
          rowHeight={200}
          gap={2}
          sx={{ overflow: "hidden" }}
        >
          {documents.map((item, index) => {
            const { rows, cols } = pattern[index % pattern.length];
            return (
              <ImageListItem
                key={item?.id}
                cols={cols}
                rows={rows}
                sx={{
                  overflow: "hidden",
                  display: "block",
                  opacity: 0.7,
                  transition: "opacity 0.3s linear",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
              >
                <Options imageId={item?.id} />
                <Item
                  original={item?.data?.imageURL}
                  thumbnail={item?.data?.imageURL}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      {...srcset(item?.data?.imageURL, 200, rows, cols)}
                      alt={
                        item?.data?.uName || item?.data?.uEmail?.split("@")[0]
                      }
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}
                </Item>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    color: "white ",
                    background: "rgba(0,0,0,.3)",
                    p: "5px",
                    borderTopRightRadius: 8,
                  }}
                >
                  {DateTime.fromJSDate(
                    item?.data?.timestamp?.toDate()
                  ).toRelative()}
                </Typography>
                <Tooltip
                  title={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                  sx={{ position: "absolute", bottom: "3px", right: "3px" }}
                >
                  <Avatar
                    src={item?.data?.uPhoto}
                    slotProps={{ "aria-hidden": true }}
                  />
                </Tooltip>
              </ImageListItem>
            );
          })}
        </ImageList>
      </Gallery>
    </div>
  );
}

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
