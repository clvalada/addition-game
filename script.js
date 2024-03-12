// script.js
const scoreBoard = document.getElementById("scoreboard");
const homeTeamScoreDisplay = document.getElementById("home-team-score");
const awayTeamScoreDisplay = document.getElementById("away-team-score");
const gameText = document.getElementById("game-text");
const feedbackText = document.getElementById("feedback-text");

let correct = 0;
let totalQuestions = 0;

function startGame() {
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    scoreBoard.style.display = "block"; // Show the scoreboard
    gameText.textContent = "Add the Home Team and Away Team scores to find the total points scored in the game.";
    correct = 0;
    totalQuestions = 0;
    feedbackText.textContent = ""; // Clear previous feedback

    // Generate random scores for home and away teams
    const homeTeamScore = Math.floor(Math.random() * 10);
    const awayTeamScore = Math.floor(Math.random() * 10);
    
    // Update the scoreboard with the new scores
    homeTeamScoreDisplay.textContent = homeTeamScore;
    awayTeamScoreDisplay.textContent = awayTeamScore;

    // Calculate the correct answer
    correctAnswer = homeTeamScore + awayTeamScore;
}

// Event listener that starts the game when the "Start" button is clicked
document.getElementById("start-button").addEventListener("click", startGame);

// Listen for form submission
document.getElementById('answerBox').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the user's answer from the input field
    var userAnswer = parseInt(document.getElementById('user-input').value);

    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        feedbackText.textContent = "Correct!";
        correct++;
    } else {
        feedbackText.textContent = "Incorrect! The correct answer is " + correctAnswer;
    }

    totalQuestions++;

    // Check if all questions have been asked
    if (totalQuestions === 10) {
        // Determine the game text based on the number of correct answers
        if (correct <= 5) {
            gameText.textContent = "Good try, Rookie. Keep practicing and you'll be an All-Star soon!";
        } else if (correct <= 7) {
            gameText.textContent = "Nice work. You're a veteran player now.";
        } else if (correct <= 9) {
            gameText.textContent = "You're on fire!";
        } else if (correct === 10) {
            gameText.textContent = "You are the G.O.A.T!";
        }
    } else {
        startGame(); // Start a new question
    }

    // Optionally, you can reset the input field after submission
    document.getElementById('user-input').value = "";
});
