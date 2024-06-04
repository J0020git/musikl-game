import Box from "@mui/material/Box";

const PlaylistCover = ({ src, alt, size, sx, ...props }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: size ? size : "100%",
        paddingTop: size ? size : "100%",
        overflow: "hidden",
        "& img": {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
        },
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      <img src={src} alt={alt} />
    </Box>
  );
};

export default PlaylistCover;
