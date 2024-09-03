import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import PlaylistCover from "./PlaylistCover";
import PlaylistTypography from "./PlaylistTypography";

const GamePause = ({ img, name, artists, album }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <PlaylistTypography variant="body1" lines={2} sx={{ width: "100%" }}>
        The answer was...
      </PlaylistTypography>
      <PlaylistCover src={img} alt="" size="80%" />
      <Box>
        <PlaylistTypography variant="h4" lines={2} sx={{ fontWeight: "600", width: "100%", textAlign: "center" }}>
          {name}
        </PlaylistTypography>
        <PlaylistTypography variant="body1" color="text.secondary" lines={2} sx={{ width: "100%", textAlign: "center" }}>
          {artists.join(", ")}
        </PlaylistTypography>
      </Box>
      <PlaylistTypography variant="body1" color="text.secondary" lines={2} sx={{ width: "100%", textAlign: "center" }}>
        {album}
      </PlaylistTypography>
    </Stack>
  );
};

export default GamePause;
