import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ContentBox from "../components/ContentBox";

const Room = ({ socket }) => {
  const { roomCode } = useParams();

  useEffect(() => {
    const name = localStorage.getItem("name");
    socket.emit("joinRoom", { name, roomCode });
  }, [socket, roomCode]);

  return (
    <RoomStack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={1}
    >
      <ContentBox size={1}>
        <Typography variant="caption" color="text.secondary">Room Code</Typography>
        <Typography variant="h3">{roomCode}</Typography>
        Player List
      </ContentBox>
      <ContentBox size={2}>Game Screen</ContentBox>
      <ContentBox size={1}>Chat</ContentBox>
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
