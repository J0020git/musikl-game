import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const HomeContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  margin: 'auto',
  borderRadius: '8px',
}));

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

const Home = ({ socket }) => {
  function createRoom() {
    const roomCode = generateRandomCode();
    socket.emit("createRoom", { roomCode });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <HomeContent direction='column' spacing={4}>
        <Typography variant='h2' textAlign='center'>Musikl</Typography>
        <TextField id='name' label='Name' placeholder='Enter your name' />
        <Button variant='contained' onClick={createRoom}>Create Room</Button>
        <Box>
          <TextField id='roomCode' label='Room Code' placeholder='Enter the invite code' sx={{ width: '100%' }}/>
          <Button variant='contained' sx={{ width: '100%' }}>Join Room</Button>
        </Box>
      </HomeContent>
    </Box>
  )
};

export default Home;