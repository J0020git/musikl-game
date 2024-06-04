import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useState, useEffect } from "react";
import PlaylistCard from "./PlaylistCard";

const GameSettings = ({ socket }) => {
  const [playlist, setPlaylist] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [loading, setLoading] = useState(false);

  async function sendPlaylist() {
    if (playlist.trim() === "") {
      setPlaylist("");
      return;
    }
    const urlParts = playlist.split('/');
    const playlistId = urlParts[urlParts.length - 1].split('?')[0];
    setLoading(true);
    await socket.emit("sendPlaylist", { playlistId });
    setPlaylist("");
  }

  function receivePlaylist(playlistData) {
    if (JSON.stringify(playlistData) !== "{}") {
      function decodeHtmlEntities(str) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        return doc.documentElement.textContent;
      }

      const playlistDetails = {
        playlistId: playlistData.id,
        name: decodeHtmlEntities(playlistData.name),
        description: decodeHtmlEntities(playlistData.description),
        img: playlistData.images[0].url,
      }
      setCurrentPlaylist(playlistDetails)
    }
    setLoading(false);
  }

  useEffect(() => {
    socket.on("receivePlaylist", receivePlaylist);

    return () => {
      socket.off("receivePlaylist", receivePlaylist);
    };
  }, [socket]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h6">Game Setup</Typography>

      <Stack direction="row" spacing={1} sx={{ my: 1 }}>
        <TextField label="Playlist" variant="outlined" size="small" fullWidth
          disabled={loading}
          value={playlist}
          onChange={(event) => setPlaylist(event.target.value)}
        />
        <Button variant="contained" disabled={loading} onClick={sendPlaylist}>Set</Button>
      </Stack>
      {JSON.stringify(currentPlaylist) !== "{}" ? <PlaylistCard playlistDetails={currentPlaylist} /> : <></>}
    </Box>
  );
};

export default GameSettings;
