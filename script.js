const scoreBoard = document.getElementById("scoreboard");
const homeTeamScore = document.getElementById("home-team-score");
const awayTeamScore = document.getElementById("away-team-score");

let correct = 0;
let gameOver = false;

function startGame() {
    const startButton = document.getElementById("start-game");
    startButton.style.display = "none";
}