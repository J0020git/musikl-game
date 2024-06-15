import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";

const GamePlay = () => {
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    const everySecond = window.setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(everySecond);
  }, []);

  const reset = () => {
    setTimerSeconds(0);
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      Play Area
      <p>{timerSeconds}</p>
      <Button onClick={reset}>Reset</Button>
    </Box>
  );
};

export default GamePlay;
