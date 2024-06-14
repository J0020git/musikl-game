import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ContentStack from "../components/ContentStack";

const Home = ({ name, setName }) => {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(name.trim() === "");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [joinDisabled, setJoinDisabled] = useState(true);

  function joinRoom(roomCode) {
    localStorage.setItem("name", name);
    navigate(`/room/${roomCode}`);
  }

  const handleCodeChange = (newCode) => {
    if (newCode.length === 4) {
      const isValidCode = /^[A-Za-z]{4}$/.test(newCode);
      if (isValidCode) setCode(newCode.toUpperCase());
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
      <ContentStack direction="column" spacing={4}>
        <Typography variant="h2" textAlign="center">
          Musikl
        </Typography>
        <TextField
          id="name"
          label="Name"
          placeholder="Enter your name"
          defaultValue={name}
          onChange={(event) => {
            setName(event.target.value.trim());
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
        <Button variant="contained" onClick={() => joinRoom(generateRandomCode())} disabled={nameError}>
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
            defaultValue={code}
            onChange={(event) => {
              handleCodeChange(event.target.value);
            }}
            inputProps={{ maxLength: 4 }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            disabled={joinDisabled || nameError}
            onClick={() => joinRoom(code)}
          >
            Join Room
          </Button>
        </Box>
      </ContentStack>
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