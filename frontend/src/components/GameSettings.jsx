import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useState, useEffect } from "react";

const GameSettings = ({ socket }) => {
  const [playlist, setPlaylist] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");

  async function sendPlaylist() {
    if (playlist.trim() === "") {
      setPlaylist("");
      return;
    }
    const urlParts = playlist.split('/');
    const playlistId = urlParts[urlParts.length - 1].split('?')[0];
    await socket.emit("sendPlaylist", { playlistId });
    setPlaylist("");
  }

  function receivePlaylist(playlistData) {
    setCurrentPlaylist(playlistData.playlistId);
  }

  useEffect(() => {
    socket.on("receivePlaylist", receivePlaylist);

    return () => {
      socket.off("receivePlaylist", receivePlaylist);
    };
  }, [socket]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h3">Game Settings</Typography>

      <Stack direction="row" spacing={1} sx={{ my: 1 }}>
        <TextField label="Playlist" variant="outlined" size="small" fullWidth
          value={playlist}
          onChange={(event) => setPlaylist(event.target.value)}
        />
        <Button variant="contained" onClick={sendPlaylist}>Set</Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">Current Playlist</Typography>
      <Typography variant="body1">{currentPlaylist}</Typography>
    </Box>
  );
};

export default GameSettings;
