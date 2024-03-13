const levelText = document.getElementById('level-text');
const startButton = document.getElementById('start-button');
const scoreboard = document.getElementById('scoreboard');
const homeTeamScoreDisplay = document.getElementById('home-team-score');
const awayTeamScoreDisplay = document.getElementById('away-team-score');
const answerBox = document.getElementById('answer-box');
const feedbackText = document.getElementById('feedback-text');
const nextQuestionButton = document.getElementById('next-question');
const checkAnswerButton = document.getElementById('check-answer'); 
const endGameButtons = document.getElementById('end-game-buttons');
const playAgainButton = document.getElementById('play-again');

let homeTeamScore = 0;
let awayTeamScore = 0;
let questionCounter = 0;
let correctAnswers = 0;

function startGame() {
    startButton.style.display = 'none';
    scoreboard.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    homeTeamScore = Math.floor(Math.random() * 6);
    awayTeamScore = Math.floor(Math.random() * 6);
    homeTeamScoreDisplay.textContent = homeTeamScore;
    awayTeamScoreDisplay.textContent = awayTeamScore;
}

function checkAnswer() {
    const userAnswer = parseInt(answerBox.value);
    const totalGoals = homeTeamScore + awayTeamScore;

    if (userAnswer === totalGoals) {
        feedbackText.textContent = "Correct! The total number of goals scored is " + totalGoals;
        correctAnswers++;
    } else {
        feedbackText.textContent = "Nope. The total number of goals scored is " + totalGoals;
    }

    questionCounter++;

    if (questionCounter === 10) {
        endGame();
    } else {
        nextQuestionButton.style.display = 'block'; // Display the next question button
        feedbackText.style.display = 'block'; // Display the feedback text

        // Reset input box for the next question
        answerBox.value = '';
    }
}

function endGame() {
    answerBox.disabled = true;
    nextQuestionButton.disabled = true;

    if (correctAnswers > 6) {
        feedbackText.textContent = "Nice work, Rookie. You can move to the next level";
        endGameButtons.style.display = 'block';
    } else {
        feedbackText.textContent = "Good try, Rookie. You need to get at least 7 questions correctly";
        playAgainButton.style.display = 'block';
    }

    questionCounter = 0;
    correctAnswers = 0;
}

startButton.addEventListener('click', startGame);
nextQuestionButton.addEventListener('click', function() {
    showQuestion();
    answerBox.value = '';
    nextQuestionButton.style.display = 'none'; 
    feedbackText.style.display = 'none'; 
});
checkAnswerButton.addEventListener('click', checkAnswer); 
answerBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
