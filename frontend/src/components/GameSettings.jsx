import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useState, useEffect } from "react";
import PlaylistCard from "./PlaylistCard";

const noPlaylistDetails = {
  name: "No Playlist",
  description: "Set a playlist to use for the game",
  img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXUExURSIjJiEiJSAhJCcoKyoqLSYnKiQlKCsrLjMzNjY3OTw8Pj8/QTo6PSwsLyssLjAxMzg4Oz09Pz4+QDs7PiQlJzIyNTc3OTs7PS8vMTc4Oi8vMikqLTIyNDo7PSUmKTAwMz0+QCkpLDo6PCUmKDY2OCAhJSEiJjU1OCgpLDAwMicnKzU1NyorLicnKi0tLy0uMD49Pzg4OjMzNS4uMTExNC0tMCsrLSkqLDk5Oy8wMjQ0Ny4vMSMkJyAiJTk5PCwtLygpKzQ0NiwtMD09QCorLTY2OTM0Njw9PyssLzw8PyUlKSEjJjU2ODExMyYmKTM0NTs8PjEyNCIiJjQ1NyYnKTc3OjIzNDs6PSEjJSYmKjk6PCUmKj8+QMe60mIAAAAJcEhZcwAADsIAAA7CARUoSoAAAAOeSURBVHhe7Zl9V9owFId7qa3QbGC72U5RcMzhCzhFZHNSBzJBnS+b00338v0/x5ISnNBUQdpmZ97nHzmnOcnj7yYX2ioIgiAIgiAIgiAI8ugAAP5JLpBQ1AlNtgtLQ59Mpgzy5KlMF5qGls5MGSYhlkWeqXJcWBrP09O2Y1ELzgsJKpAAmsaMYd7yoMzGq+LtjeycPd9v4RGnCk0jl87bxoLAgxKXCkvj5ZxdsNgWFROHCq3Kq3R+0aDHJNCDErUKvKZpZOyCd2DvJkKVIk1DT2eW7kujR1QqtH3llldmhkmjR0QqsJopOUOm0SMaFSg7I1l4RKICa4WRRaJSeWPy6UchGpX1DT79KESk8g+lMoLKza6Sq0KPmVPZLFe94dJU2GE3Uls1DSDxVqIKIWbB3nqn068ouj6k5ah4aSytpHPsVxQfLkOFprG9+F6ladx4UOJWoWmYhZ36hJ64beERqwohRqVU11xlV7RcXCosjQ+bjaabCFwpFhVCHHuvlevfGj5iUDErmbSqBKfRI3qVjzUaxjDTR69i1oacG1VEoIoIVBHxqFQ2MJU+MBURWCARWCARuFdEYIFEDKnCfoUzon+ScM9eAcjtz5ba7elW0xsuLRWAZoe9e2BYDjORpQJaxxx8nipHBcqCB7tSVGD2wG8iRaVYZ5d9SFCBw6Pu2gNIUPm0LagOJWQVr2VRFfZgPUDleLq7so8QVWBX0VezraymQ4OlIm5xoHa7iJ/QVADWVtqGN6dzcrJA/wSonIrLY1mHIanA2ecv7JGsR/eDuEBuxRvix1CP+ZDxgJrj+2fFKlo3OR/E5gPG5VzQKYQqkD3glwephlIft8On60O4V2Bf2N4sMqPzEWPx9ZzP149YJStWOZoMIxRoiWcXq6jivbLFr48FaAGvT8WH2a2IRu+5/PJYQFD3DOgrdX75NhduGOVRLuf5fIMENH7922As5vdQMlGgyif0YYrbJyz3F5RcNa75pXG54FP6MNQiH9IPqPbf16jESP4IpTgUd0q8aWn7DIod3Crr/uzrwdjJDvUaYBgg9zNA5a72Ccra+mYqlayfhSZyh8o97ZPdiSWE78weTlCBjHK46wzDHl97gHz8Jvzee5At8emJFrftqxAxT/nFeIHlqwEXUgjrt+GoFLN97ZOYyUtJJjSXX/Re3LP5TSyn0wz5jI4EXKv5ikMplBphNq0HwW7EdN31bsgQBEEQBEEQBEGQ/w5F+QP9A9YG/nnv+wAAAABJRU5ErkJggg==",
  tracks: [],
}

const GameSettings = ({ socket, startGame }) => {
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
      setCurrentPlaylist(playlistData)
    }
    setLoading(false);
  }

  useEffect(() => {
    socket.on("receivePlaylist", receivePlaylist);

    return () => {
      socket.off("receivePlaylist", receivePlaylist);
    };
  }, [socket]);

  function playButtonDisabled() {
    return loading || JSON.stringify(currentPlaylist) === "{}"
  }

  return (
    <Stack direction="column" spacing={1} sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h6">Game Setup</Typography>

      <Stack direction="row" spacing={1}>
        <TextField label="Playlist" variant="outlined" size="small" fullWidth
          disabled={loading}
          value={playlist}
          placeholder="https://open.spotify.com/playlist/..."
          onChange={(event) => setPlaylist(event.target.value)}
        />
        <Button variant="contained" disabled={loading} onClick={sendPlaylist}>Set</Button>
      </Stack>
      {JSON.stringify(currentPlaylist) === "{}" ? <PlaylistCard playlistDetails={noPlaylistDetails} /> : <PlaylistCard playlistDetails={currentPlaylist} />}
      <Button variant="contained" disabled={playButtonDisabled()} onClick={startGame} >Play</Button>
    </Stack>
  );
};

export default GameSettings;
