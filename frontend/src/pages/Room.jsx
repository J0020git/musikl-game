import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomCode } = useParams();

    return (
      <div>Room {roomCode}</div>
    )
  };
  
  export default Room;
  