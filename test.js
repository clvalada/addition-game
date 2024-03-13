const scoreBoard = document.getElementById("scoreboard");
const homeTeamScoreDisplay = document.getElementById("home-team-score");
const awayTeamScoreDisplay = document.getElementById("away-team-score");
const gameText = document.getElementById("game-text");
const feedbackText = document.getElementById("feedback-text");
const levelElement = document.getElementById("level-text");
const levels = [
    {
        id: 1,
        levelText: "Level 1: Soccer",
        description: "This is a description for Soccer."
    },
    {
        id: 2,
        levelText: "Level 2: Baseball",
        description: "This is a description for Baseball."
    },
    {
        id: 3,
        levelText: "Level 3: Football",
        description: "This is a description for Football."
    },
    {
        id: 4,
        levelText: "Level 4: Basketball",
        description: "This is a description for Basketball."
    }
];

let correct = 0;
let totalQuestions = 0;
let correctAnswer;
let usedQuestions = [];

// Define a function to handle the end of each level
function endLevel() {
    // Determine the game text based on the number of correct answers
    let levelCompletionText = "";
    if (correct <= 5) {
        levelCompletionText = "Good try, Rookie. You've got a lot of potential!";
    } else if (correct <= 7) {
        levelCompletionText = "Nice work. You're a veteran player now.";
    } else if (correct <= 9) {
        levelCompletionText = "You're on fire, All-Star!";
    } else if (correct === 10) {
        levelCompletionText = "You are the G.O.A.T!";
    }
    
    // Update game text
    gameText.textContent = levelCompletionText;

    // Hide the answer box
    document.getElementById('answer-box').style.display = 'none';

    // Show the end game buttons
    document.getElementById('end-game-buttons').style.display = 'block';

    // Add functionality to "Play Again" button
    document.getElementById('play-again').addEventListener('click', function() {
        window.location = 'index.html';
    });

    // Add functionality to "Next Level" button
    document.getElementById('next-level').addEventListener('click', function() {
        // Start the next level
        const nextLevel = (totalQuestions / 10) % levels.length; // Calculate next level index
        startGame(nextLevel);
    });
}

// Modify nextQuestionHandler function to handle end of level
function nextQuestionHandler(event) {
    event.preventDefault();

    // Increment totalQuestions
    totalQuestions++;

    if (totalQuestions % 10 === 0) { // Check if 10 questions have been answered
        endLevel(); // If 10 questions answered, end the level
    } else { // Otherwise, start a new question
        startNewQuestion();
    }
}

// Add a function to start a new question
function startNewQuestion() {
    document.getElementById('answer-box').style.display = 'block';
    document.getElementById('user-answer').style.display = 'block';
    document.getElementById('next-question').style.display = 'none';
    feedbackText.textContent = "";

    let homeTeamScore, awayTeamScore;
    do {
        switch (totalQuestions % levels.length) { // Use totalQuestions to determine level
            case 0:
                homeTeamScore = Math.floor(Math.random() * 6); // Adjusted to generate numbers between 0 and 5
                awayTeamScore = Math.floor(Math.random() * 6); // Adjusted to generate numbers between 0 and 5
                break;
            case 1:
                homeTeamScore = Math.floor(Math.random() * 10);
                awayTeamScore = Math.floor(Math.random() * 10);
                break;
            case 2:
                homeTeamScore = Math.floor(Math.random() * 50);
                awayTeamScore = Math.floor(Math.random() * 50);
                break;
            case 3:
                homeTeamScore = Math.floor(Math.random() * 120);
                awayTeamScore = Math.floor(Math.random() * 120);
                break;
            default:
                homeTeamScore = Math.floor(Math.random() * 6); // Adjusted to generate numbers between 0 and 5
                awayTeamScore = Math.floor(Math.random() * 6); // Adjusted to generate numbers between 0 and 5
                break;
        }
    } while (usedQuestions.includes(`${homeTeamScore},${awayTeamScore}`));

    usedQuestions.push(`${homeTeamScore},${awayTeamScore}`);

    homeTeamScoreDisplay.textContent = homeTeamScore;
    awayTeamScoreDisplay.textContent = awayTeamScore;

    correctAnswer = homeTeamScore + awayTeamScore;

    // Add event listener for "Next Question" button click
    document.getElementById('next-question').addEventListener('click', nextQuestionHandler);
}

// Modify startGame function to reset game state
function startGame(level) {
    document.getElementById('next-question').removeEventListener('click', nextQuestionHandler);

    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    scoreBoard.style.display = "block";
    gameText.textContent = `Add the Home Team and Away Team scores to find the total points scored in the game for ${levels[level].levelText}`;
    levelElement.textContent = levels[level].levelText;
    correct = 0;
    feedbackText.textContent = "";
    totalQuestions = level * 10; // Set totalQuestions to the starting question index for the level

    startNewQuestion(); // Start the first question
}

// Event listener for the "Start" button
document.getElementById("start-button").addEventListener("click", function() {
    startGame(0);
});

// Event listener for the "Check Answer" button
document.getElementById('user-answer').addEventListener('click', function(event) {
    event.preventDefault();
    
    var userAnswer = parseInt(document.getElementById('user-input').value);

    if (isNaN(userAnswer)) {
        feedbackText.textContent = "Please enter a valid number.";
        return;
    }

    if (userAnswer === correctAnswer) {
        feedbackText.textContent = "Nice work! The combined number of points scored is " + correctAnswer;
        correct++;
    } else {
        feedbackText.textContent = "Nope... The combined number of points scored is " + correctAnswer;
    }

    document.getElementById('user-input').value = "";
    document.getElementById('answer-box').style.display = 'none';
    document.getElementById('user-answer').style.display = 'none';
    document.getElementById('next-question').style.display = 'block';
});

// Hide end game buttons initially
document.getElementById('end-game-buttons').style.display = 'none';
