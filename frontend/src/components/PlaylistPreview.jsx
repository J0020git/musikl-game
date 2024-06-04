import Stack from "@mui/material/Stack";

import PlaylistCover from "./PlaylistCover";
import PlaylistTypography from "./PlaylistTypography";

const PlaylistPreview = ({ playlistDetails }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      spacing={0}
      sx={{ width: "100%" }}
    >
      <PlaylistTypography variant="h3" lines={2} sx={{ fontWeight: "600" }}>
        {playlistDetails.name}
      </PlaylistTypography>
      <PlaylistTypography variant="caption" color="text.secondary" lines={2}>
        {playlistDetails.description}
      </PlaylistTypography>
      <PlaylistCover src={playlistDetails.img} alt="playlist cover" size="75%" sx={{ margin: "0px 12.5%" }} />
    </Stack>
  );
};

export default PlaylistPreview;
