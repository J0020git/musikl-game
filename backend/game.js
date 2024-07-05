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
    guessTime: gameSettings.guessTime,
    roundsTotal: gamePlaylist.length,
    round: 1,
  }

  return game
}

module.exports = {
  shuffleArray,
  createGame,
};
