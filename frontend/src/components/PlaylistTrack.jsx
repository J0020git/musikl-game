import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PlaylistTypography from "./PlaylistTypography";

const PlaylistTrack = ({ number, trackDetails }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Typography color="text.secondary" sx={{ width: "1.5em" }}>{number}</Typography>
      <Box sx={{ width: "100%", margin: "0px" }}>
        <PlaylistTypography lines={1}>{trackDetails.name}</PlaylistTypography>
        <PlaylistTypography lines={1} color="text.secondary">{trackDetails.artists.join(", ")}</PlaylistTypography>
      </Box>
    </Stack>
  );
};

export default PlaylistTrack;
