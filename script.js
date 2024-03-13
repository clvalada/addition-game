const levelText = document.getElementById('level-text')
const startButton = document.getElementById('start-button');
const scoreboard = document.getElementById('scoreboard');
const homeTeamScore = document.getElementById('home-team-score');
const awayTeamScore = document.getElementById('away-team-score');
const answerBox = document.getElementById('answer-box');
const feedbackText = document.getElementById('feedback-text');
const nextQuestionButton = document.getElementById('next-question');
const trophyImage = document.getElementById('trophy-image');
const endGameButtons = document.getElementByID('end-game-buttons');
const playAgainButton = document.getElementById('play-again');

homeTeamScore = 0
awayTeamScore = 0

//Start Game
click startButton
hide startButton
show scoreboard

function showQuestion (){
show random number 0-5 for homeTeamScore
show random number 0-5 for awayTeamScore
}

user types numeric answer into answerBox

if answerBox === sum(homeTeamScore, awayTeamScore) 
show feedbackText "Correct! The total number of goals scored is" + (homeTeamScore, awayTeamScore)
else show feedbackText "Nope. The total number of goals scored is" + (homeTeamScore, awayTeamScore)

show nextQuestionButton onClick repeat showQuestion()

Do this 10 times

//end game
after 10 questions
if user answers more than 6 questions correctly
show "Nice work, Rookie. You can move to the next level" in feedbackText
and show endGameButtons
else show "Good try, Rookie. You need to get at least " 
and show playAgainButton
