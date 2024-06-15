import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material';


import PlaylistTypography from "./PlaylistTypography";
import PlaylistCover from "./PlaylistCover";
import PlaylistTracklist from "./PlaylistTracklist";

const PlaylistCard = ({ playlistDetails }) => {
  const theme = useTheme();
  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent sx={{ backgroundColor: theme.palette.background.level3 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <PlaylistCover
            src={playlistDetails.img}
            alt="playlist cover"
            size="30%"
          />
          <Box sx={{ width: "70%", px: 1 }}>
            <PlaylistTypography variant="h4" lines={2} sx={{ fontWeight: "600", width: "100%" }}>
              {playlistDetails.name}
            </PlaylistTypography>
            <PlaylistTypography variant="body1" color="text.secondary" lines={2} sx={{ width: "100%" }}>
              {playlistDetails.description}
            </PlaylistTypography>
          </Box>
        </Stack>
      </CardContent>
      <CardContent sx={{ backgroundColor: theme.palette.background.level2, height: "16rem" }}>
        <PlaylistTracklist tracklist={playlistDetails.tracks} />
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
