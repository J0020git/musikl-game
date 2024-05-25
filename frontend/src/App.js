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
      light: "#121212",
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
