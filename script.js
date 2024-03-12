const scoreBoard = document.getElementById("scoreboard");
const homeTeamScoreDisplay = document.getElementById("home-team-score");
const awayTeamScoreDisplay = document.getElementById("away-team-score");
const gameText = document.getElementById("game-text");
const feedbackText = document.getElementById("feedback-text");
const levelElement = document.getElementById("level");
const levels = [
    {
        id: 1,
        text: "Soccer",
        image: "soccer.jpg",
        description: "This is a description for Soccer."
    },
    {
        id: 2,
        text: "Baseball",
        image: "baseball.jpg",
        description: "This is a description for Baseball."
    },
    {
        id: 3,
        text: "Football",
        image: "football.jpg",
        description: "This is a description for Football."
    },
    {
        id: 4,
        text: "Basketball",
        image: "basketball.jpg",
        description: "This is a description for Basketball."
    }
];

let correct = 0;
let totalQuestions = 0;
let correctAnswer;
let usedQuestions = []; // Array to store used question pairs

function startGame(level) {
    // Remove previous event listener before adding a new one
    document.getElementById('next-question').removeEventListener('click', nextQuestionHandler);

    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    scoreBoard.style.display = "block"; // Show the scoreboard
    gameText.textContent = `Add the Home Team and Away Team scores to find the total points scored in the game for ${levels[level].text}.`;
    correct = 0;
    feedbackText.textContent = ""; // Clear previous feedback

    // Generate unique random scores for home and away teams based on the level
    let homeTeamScore, awayTeamScore;
    switch (level) {
        case 0:
            homeTeamScore = Math.floor(Math.random() * 5);
            awayTeamScore = Math.floor(Math.random() * 5);
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
            homeTeamScore = Math.floor(Math.random() * 5);
            awayTeamScore = Math.floor(Math.random() * 5);
            break;
    }

    // Add this question pair to usedQuestions
    usedQuestions.push(`${homeTeamScore},${awayTeamScore}`);

    // Update the scoreboard with the new scores
    homeTeamScoreDisplay.textContent = homeTeamScore;
    awayTeamScoreDisplay.textContent = awayTeamScore;

    // Calculate the correct answer
    correctAnswer = homeTeamScore + awayTeamScore;

    // Add event listener for "Next Question" button click
    document.getElementById('next-question').addEventListener('click', nextQuestionHandler);
}

// Event listener that starts the game when the "Start" button is clicked
document.getElementById("start-button").addEventListener("click", function() {
    // Start the game with level 0 (first level)
    startGame(0);
});

// Define the event handler function for "Next Question" button click
function nextQuestionHandler(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Show the answer box and button
    document.getElementById('answer-box').style.display = 'block';
    document.getElementById('user-answer').style.display = 'block';

    // Hide the "Next Question" button
    document.getElementById('next-question').style.display = 'none';

    // Clear the feedback text
    feedbackText.textContent = "";

    // Increment totalQuestions only when a new question is generated
    totalQuestions++;

    // Check if all questions have been asked
    if (totalQuestions === 10) {
        // Determine the game text based on the number of correct answers
        if (correct <= 5) {
            gameText.textContent = "Good try, Rookie. You've got a lot of potential!";
        } else if (correct <= 7) {
            gameText.textContent = "Nice work. You're a veteran player now.";
        } else if (correct <= 9) {
            gameText.textContent = "You're on fire, All-Star!";
        } else if (correct === 10) {
            gameText.textContent = "You are the G.O.A.T!";
        }

        // Hide the answer box
        document.getElementById('answer-box').style.display = 'none';

        // Show the trophy image
        const trophyImage = document.createElement('img');
        trophyImage.src = 'trophy_image.png'; // Replace 'trophy_image.png' with the path to your trophy image
        scoreBoard.innerHTML = '';
        scoreBoard.appendChild(trophyImage);

        // Hide the "Next Question" button
        document.getElementById('next-question').style.display = 'none';

        // Create "Play Again" button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.addEventListener('click', function() {
            window.location = 'index.html';
        });

        // Create "Next Level" button
        const nextLevelButton = document.createElement('button');
        nextLevelButton.textContent = 'Next Level';
        // Add functionality for the "Next Level" button if needed

        // Append buttons to the scoreboard
        scoreBoard.appendChild(playAgainButton);
        scoreBoard.appendChild(nextLevelButton);
    } else {
        // Start a new game with the next level
        startGame(totalQuestions % levels.length);
    }
}

// Listen for button click
document.getElementById('user-answer').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get the user's answer from the input field
    var userAnswer = parseInt(document.getElementById('user-input').value);

    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        feedbackText.textContent = "Nice work! The combined number of points scored is " + correctAnswer;
        correct++;
    } else {
        feedbackText.textContent = "Nope... The combined number of points scored is " + correctAnswer;
    }

    // Reset the input field after submission
    document.getElementById('user-input').value = "";

    // Hide the answer box and button
    document.getElementById('answer-box').style.display = 'none';
    document.getElementById('user-answer').style.display = 'none';

    // Show the "Next Question" button
    document.getElementById('next-question').style.display = 'block';
});
