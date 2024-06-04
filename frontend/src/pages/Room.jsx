import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ContentBox from "../components/ContentBox";
import Chat from "../components/Chat";
import GameSettings from "../components/GameSettings";
import { useEffect, useState } from "react";

const Room = ({ socket, name }) => {
  const { roomCode } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (name === "") {
      alert("No name!");
    } else {
      socket.emit("joinRoom", { name, roomCode });
    }
  }, [socket, name, roomCode]);

  useEffect(() => {
    function updateUsers(usersData) {
      setUsers(usersData.users);
    }

    socket.on("updateUsers", updateUsers);

    return () => {
      socket.off("updateUsers", updateUsers);
    };
  }, [socket]);

  return (
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
        <GameSettings socket={socket} />
      </ContentBox>
      <ContentBox sx={{ width: "28%" }}>
        <Chat socket={socket} name={name}/>
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
