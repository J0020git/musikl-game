import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ContentBox from "../components/ContentBox";
import Chat from "../components/Chat";
import GameSettings from "../components/GameSettings";
import GamePlay from "../components/GamePlay";
import Name from "./Name";

import { useEffect, useState } from "react";

const Room = ({ socket, name, setName }) => {
  const { roomCode } = useParams();
  const [users, setUsers] = useState([]);
  const [noName, setNoName] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [timerEnd, setTimerEnd] = useState(0);

  useEffect(() => {
    if (name === "") {
      setNoName(true);
    } else {
      socket.emit("joinRoom", { name, roomCode });
      setNoName(false);
    }
  }, [socket, name, roomCode]);

  useEffect(() => {
    function updateUsers(usersData) {
      setUsers(usersData.users);
    }
    function receiveGameStart(pauseTimerEnd) {
      setTimerEnd(pauseTimerEnd);
      setGameActive(true);
    }
    function receiveGamePlay({ timerEnd: playTimerEnd, playDuration, previewUrl }) {
      console.log(playTimerEnd, playDuration, previewUrl);
    }

    socket.on("updateUsers", updateUsers);
    socket.on("receiveGameStart", receiveGameStart);
    socket.on("receiveGamePlay", receiveGamePlay);

    return () => {
      socket.off("updateUsers", updateUsers);
      socket.off("receiveGameStart", receiveGameStart);
      socket.off("receiveGamePlay", receiveGamePlay);
    };
  }, [socket]);

  function startGame() {
    setGameActive(true);
    socket.emit("sendGameStart")
  }

  return (noName ? <Name setName={setName} /> :
    <RoomStack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={1}
    >
      <ContentBox sx={{ width: "28%" }}>
        <Typography variant="caption" color="text.secondary">Room Code</Typography>
        <Typography variant="h3">{roomCode}</Typography>
        {users.map((user, index) => {
          return (
            <p key={index}>
              {user.name}
            </p>
          );
        })}
      </ContentBox>
      <ContentBox sx={{ width: "44%" }}>
        {gameActive ? <GamePlay timerEnd={timerEnd} /> : <GameSettings socket={socket} startGame={startGame} />}
      </ContentBox>
      <ContentBox sx={{ width: "28%" }}>
        <Chat socket={socket} name={name} />
      </ContentBox>
    </RoomStack>
  );
};

const RoomStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  height: "100vh",
  margin: "auto",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4)
}));

export default Room;
