function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGame(roomCode, gamePlaylist, gameSettings) {
  const game = {
    roomCode,
    gamePlaylist,
    playDuration: gameSettings.playDuration,
    pauseDuration: gameSettings.pauseDuration,
    roundsTotal: gamePlaylist.length,
    round: 1,
  }

  return game
}

function calculateTimerEnd(duration) {
  return Date.now() + (duration * 1000)
}

function pauseRound(game) {
  return "pausing";
}

function playRound(game) {
  const timerEnd = calculateTimerEnd(game.playDuration)
  return {
    timerEnd,
    playDuration: game.playDuration,
    previewUrl: game.gamePlaylist[game.round - 1].previewUrl
  };
}

module.exports = {
  shuffleArray,
  createGame,
  pauseRound,
  playRound,
  calculateTimerEnd
};
