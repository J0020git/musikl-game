import Typography from "@mui/material/Typography";

const PlaylistTypography = ({ lines, sx, ...props }) => {
  return (
    <Typography
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: lines ? lines : 1,
        WebkitBoxOrient: 'vertical',
        ...sx
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

export default PlaylistTypography;
