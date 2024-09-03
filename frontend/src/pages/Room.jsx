import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ContentBox from "../components/ContentBox";
import Chat from "../components/Chat";
import GameSettings from "../components/GameSettings";
import GameStart from "../components/GameStart";
import GameEnd from "../components/GameEnd";
import GamePlay from "../components/GamePlay";
import GamePause from "../components/GamePause";
import Name from "./Name";

import { useEffect, useState } from "react";

const Room = ({ socket, name, setName }) => {
  const { roomCode } = useParams();
  const [users, setUsers] = useState([]);
  const [noName, setNoName] = useState(false);
  const [gameState, setGameState] = useState("Settings");
  const [timerEnd, setTimerEnd] = useState(0);

  const [answerImage, setAnswerImage] = useState("");
  const [answerName, setAnswerName] = useState("");
  const [answerArtists, setAnswerArtists] = useState([]);
  const [answerAlbum, setAnswerAlbum] = useState("");

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
      setGameState("Start")
      setTimerEnd(pauseTimerEnd);
    }
    function receiveGameEnd() {
      setGameState("End")
    }
    function receiveGamePlay({ timerEnd: playTimerEnd, playDuration, previewUrl }) {
      setGameState("Play")
      console.log(playTimerEnd, playDuration, previewUrl);
    }
    function receiveGamePause({ name, artists, album }) {
      setAnswerImage(album.img);
      setAnswerName(name);
      setAnswerArtists(artists);
      setAnswerAlbum(album.name);
      setGameState("Pause")
    }

    socket.on("updateUsers", updateUsers);
    socket.on("receiveGameStart", receiveGameStart);
    socket.on("receiveGameEnd", receiveGameEnd);
    socket.on("receiveGamePlay", receiveGamePlay);
    socket.on("receiveGamePause", receiveGamePause);

    return () => {
      socket.off("updateUsers", updateUsers);
      socket.off("receiveGameStart", receiveGameStart);
      socket.off("receiveGameEnd", receiveGameEnd);
      socket.off("receiveGamePlay", receiveGamePlay);
      socket.off("receiveGamePause", receiveGamePause);
    };
  }, [socket]);

  function renderGameState() {
    switch (gameState) {
      case "Settings":
        return <GameSettings socket={socket} />;
      case "Start":
        return <GameStart />
      case "End":
        return <GameEnd />
      case "Play":
        return <GamePlay timerEnd={timerEnd} />;
      case "Pause":
        return <GamePause img={answerImage} name={answerName} artists={answerArtists} album={answerAlbum} />;
      default:
        return <div>Invalid game state</div>;
    }
  };

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
        {renderGameState()}
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
