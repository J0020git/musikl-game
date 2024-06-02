import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { io } from "socket.io-client";
export const socket = io.connect("http://localhost:3001");

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5e35b1",
    },
    secondary: {
      main: "#1654aa",
    },
    background: {
      default: "#000000",
      level1: "#121212",
      level2: "#242424",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A7A7A7",
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.level2,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderRadius: '2px',
        },
      }),
    },
  },

});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/room/:roomCode" element={<Room socket={socket} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
