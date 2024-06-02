import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ContentBox from "../components/ContentBox";
import Chat from "../components/Chat";

const Room = ({ socket }) => {
  const { roomCode } = useParams();

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
        Player List
      </ContentBox>
      <ContentBox sx={{ width: "44%" }}>Game Screen</ContentBox>
      <ContentBox sx={{ width: "28%" }}>
        <Chat socket={socket} room={roomCode} username={localStorage.getItem("name")}/>
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
