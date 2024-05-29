import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") ? localStorage.getItem("name") : "");
  const [nameError, setNameError] = useState(name.trim() === "");
  const [codeError, setCodeError] = useState(false);
  const [joinDisabled, setJoinDisabled] = useState(true);

  function createRoom() {
    const roomCode = generateRandomCode();
    localStorage.setItem("name", name);
    navigate(`/room/${roomCode}`);
  }

  const handleCodeChange = (newCode) => {
    if (newCode.length === 4) {
      const isValidCode = /^[A-Za-z]{4}$/.test(newCode);
      setCodeError(!isValidCode);
      setJoinDisabled(!isValidCode);
    } else {
      // Only show a code error when 4 characters are typed
      setCodeError(false);
      setJoinDisabled(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HomeContent direction="column" spacing={4}>
        <Typography variant="h2" textAlign="center">
          Musikl
        </Typography>
        <TextField
          id="name"
          label="Name"
          placeholder="Enter your name"
          defaultValue={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError(event.target.value.trim() === "");
          }}
          onBlur={(event) => {
            const newName = event.target.value.trim();
            newName !== "" && localStorage.setItem("name", newName);
          }}
          error={nameError && name.length > 0}
          required
          inputProps={{ maxLength: 32 }}
        />
        <Button variant="contained" onClick={createRoom} disabled={nameError}>
          Create Room
        </Button>
        <Box>
          <TextField
            id="roomCode"
            label="Room Code"
            placeholder="Enter the invite code"
            sx={{ width: "100%" }}
            disabled={nameError}
            error={codeError}
            onChange={(event) => {
              handleCodeChange(event.target.value);
            }}
            inputProps={{ maxLength: 4 }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            disabled={joinDisabled || nameError}
          >
            Join Room
          </Button>
        </Box>
      </HomeContent>
    </Box>
  );
};

export default Home;

/**
 * Helper function to generate 4-character room code
 * @returns
 */
function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

const HomeContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(4),
  margin: "auto",
  borderRadius: "8px",
}));
