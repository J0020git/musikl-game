import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#5e35b1',
      },
      secondary: {
        main: '#1654aa',
      },
      background: {
        default: '#000000',
        light: '#121212',
      },
    }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
