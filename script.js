const levelText = document.getElementById('level-text')
const startButton = document.getElementById('start-button')
const scoreboard = document.getElementById('scoreboard')
const homeTeamScoreDisplay = document.getElementById('home-team-score')
const awayTeamScoreDisplay = document.getElementById('away-team-score')
const userInputBox = document.getElementById('textInput')
const answerBox = document.getElementById('answer-box')
const feedbackText = document.getElementById('feedback-text')
const nextQuestion = document.getElementById('next-question')
const nextQuestionButton = document.getElementById('next-question-button')
const checkAnswerButton = document.getElementById('check-answer-button')
const trophyImage = document.getElementById('trophy-image')
const tryAgainImage = document.getElementById('try-again-image')
const endGameButtons = document.getElementById('end-game-buttons')
const playAgainButton = document.getElementById('play-again')
const nextLevelButton = document.getElementById('next-level')

let homeTeamScore = 0
let awayTeamScore = 0
let questionCounter = 0
let correctAnswers = 0

function startGame() {
  startButton.style.display = 'none'
  scoreboard.style.display = 'block'
  answerBox.style.display = 'block'
  feedbackText.style.display = 'block'
  answerBox.style.display = 'block'
  showQuestion()
}

function showQuestion() {
  homeTeamScore = Math.floor(Math.random() * 6)
  awayTeamScore = Math.floor(Math.random() * 6)
  homeTeamScoreDisplay.textContent = homeTeamScore
  awayTeamScoreDisplay.textContent = awayTeamScore
}

function checkAnswer(event) {
  event.preventDefault()
  const userAnswer = parseInt(userInputBox.value)
  const totalGoals = homeTeamScore + awayTeamScore

  if (isNaN(userAnswer)) {
    feedbackText.textContent = 'Please enter a valid number.'
    return
  }

  if (userAnswer === totalGoals) {
    feedbackText.textContent =
      'Correct! The total number of goals scored is ' + totalGoals
    correctAnswers++
  } else {
    feedbackText.textContent =
      'Nope. The total number of goals scored is ' + totalGoals
  }

  questionCounter++

  if (questionCounter === 10) {
    endGame()
  } else {
    nextQuestionButton.style.display = 'block'
    nextQuestion.style.display = 'block'
    feedbackText.style.display = 'block'

    userInputBox.value = ''
  }
}

function endGame() {
  answerBox.style.display = 'none'
  nextQuestionButton.style.display = 'none'
  nextQuestion.style.display = 'none'
  scoreboard.style.display = 'none'
  feedbackText.style.display = 'block'

  if (correctAnswers > 6) {
    feedbackText.textContent =
      'Nice work, Rookie. You can advance to the next level.'
    playAgainButton.style.display = 'block'
    nextLevelButton.style.display = 'block'
    trophyImage.style.display = 'block'
  } else {
    feedbackText.textContent =
      'Good try, Rookie. You need to answer at least 7 questions correctly to advance to the next level.'
    playAgainButton.style.display = 'block'
    tryAgainImage.style.display = 'block'
  }

  questionCounter = 0
  correctAnswers = 0
}

startButton.addEventListener('click', startGame)
nextQuestionButton.addEventListener('click', function () {
  showQuestion()
  userInputBox.value = ''
  nextQuestionButton.style.display = 'none'
  nextQuestion.style.display = 'none'
  feedbackText.style.display = 'none'
})
checkAnswerButton.addEventListener('click', checkAnswer)
userInputBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkAnswer(e)
  }
})
