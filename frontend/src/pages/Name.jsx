import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ContentStack from "../components/ContentStack";

const Name = ({ setName }) => {
  const [nameInput, setNameInput] = useState("");
  const [nameInputError, setNameInputError] = useState(true);

  function handleSetName() {
    if (nameInputError) {
      return;
    }
    setName(nameInput.trim());
    localStorage.setItem("name", nameInput.trim());
  }

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
        <TextField
          id="name"
          label="Name"
          placeholder="Enter your name"
          required
          inputProps={{ maxLength: 32 }}
          onChange={(event) => {
            setNameInput(event.target.value);
            setNameInputError(event.target.value.trim() === "");
          }}
          error={nameInputError && nameInput.length > 0}
        />
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => handleSetName()}
        >
          Join Room
        </Button>
      </ContentStack>
    </Box>
  );
};

export default Name;