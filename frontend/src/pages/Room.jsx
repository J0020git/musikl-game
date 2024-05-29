import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = ({ socket }) => {
  const { roomCode } = useParams();

  useEffect(() => {
    const name = localStorage.getItem("name");
    socket.emit("joinRoom", { name, roomCode });
  }, [socket, roomCode]);

  return <div>Room {roomCode}</div>;
};

export default Room;
