import Stack from "@mui/material/Stack";

import PlaylistTrack from "./PlaylistTrack";

const PlaylistTracklist = ({ tracklist }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ height: "100%", width: "100%", overflow: "auto" }}
    >
      {tracklist.map((trackDetails, index) => {
        return (
          <PlaylistTrack key={index} number={index + 1} trackDetails={trackDetails} />
        );
      })}
    </Stack>
  );
};

export default PlaylistTracklist;
