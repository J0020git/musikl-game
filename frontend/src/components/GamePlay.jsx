import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";

const GamePlay = ({ timerEnd, stopGame }) => {
  const [timerSeconds, setTimerSeconds] = useState(null)

  useEffect(() => {
    const countdown = window.setInterval(() => {
      const timeRemainingMs = timerEnd - Date.now()
      const timeRemainingSec = Math.floor(timeRemainingMs / 1000)
      setTimerSeconds(timeRemainingSec);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timerEnd]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      GamePlay
      {timerSeconds !== null && <h1>{timerSeconds}</h1>}
    </Box>
  );
};

export default GamePlay;
