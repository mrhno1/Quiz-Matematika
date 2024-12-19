const questions = {
    easy: [
        { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
        { question: "What is 5 - 3?", answers: ["2", "3", "4", "5"], correct: 0 },
        { question: "What is 3 + 1?", answers: ["3", "4", "5", "6"], correct: 1 },
        { question: "What is 7 - 4?", answers: ["1", "2", "3", "4"], correct: 2 },
        { question: "What is 6 + 2?", answers: ["7", "8", "9", "10"], correct: 1 },
        { question: "What is 9 - 5?", answers: ["2", "3", "4", "5"], correct: 2 },
        { question: "What is 4 + 4?", answers: ["7", "8", "9", "10"], correct: 1 },
        { question: "What is 8 - 3?", answers: ["4", "5", "6", "7"], correct: 1 },
        { question: "What is 1 + 6?", answers: ["6", "7", "8", "9"], correct: 1 },
        { question: "What is 10 - 7?", answers: ["1", "2", "3", "4"], correct: 2 }
    ],
    medium: [
        { question: "What is 5 * 3?", answers: ["15", "20", "25", "30"], correct: 0 },
        { question: "What is 12 / 4?", answers: ["2", "3", "4", "5"], correct: 1 },
        { question: "What is 6 * 2?", answers: ["10", "12", "14", "16"], correct: 1 },
        { question: "What is 18 / 3?", answers: ["5", "6", "7", "8"], correct: 1 },
        { question: "What is 7 * 7?", answers: ["47", "48", "49", "50"], correct: 2 },
        { question: "What is 24 / 6?", answers: ["3", "4", "5", "6"], correct: 1 },
        { question: "What is 9 * 3?", answers: ["26", "27", "28", "29"], correct: 1 },
        { question: "What is 36 / 6?", answers: ["4", "5", "6", "7"], correct: 2 },
        { question: "What is 8 * 2?", answers: ["14", "15", "16", "17"], correct: 2 },
        { question: "What is 50 / 5?", answers: ["8", "9", "10", "11"], correct: 2 }
    ],
    hard: [
        { question: "What is the square root of 81?", answers: ["7", "8", "9", "10"], correct: 2 },
        { question: "What is 5! (factorial of 5)?", answers: ["100", "110", "120", "130"], correct: 2 },
        { question: "What is 2^5?", answers: ["16", "32", "64", "128"], correct: 1 },
        { question: "What is 10 * 10 * 10?", answers: ["100", "1000", "10000", "100000"], correct: 1 },
        { question: "What is the cube root of 27?", answers: ["2", "3", "4", "5"], correct: 1 },
        { question: "What is 15 * 15?", answers: ["200", "215", "225", "235"], correct: 2 },
        { question: "What is the square of 14?", answers: ["196", "200", "204", "210"], correct: 0 },
        { question: "What is 2^8?", answers: ["128", "256", "512", "1024"], correct: 1 },
        { question: "What is 100 / 25?", answers: ["2", "3", "4", "5"], correct: 2 },
        { question: "What is the square root of 169?", answers: ["11", "12", "13", "14"], correct: 2 }
    ]
};

let currentQuestion = 0;
let score = 0;
let selectedLevel = [];

function startQuiz(level) {
    selectedLevel = questions[level];
    currentQuestion = 0;
    score = 0;

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('answers').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');

    questionElement.textContent = selectedLevel[currentQuestion].question;
    const buttons = answersElement.querySelectorAll('button');
    
    buttons.forEach((button, index) => {
        button.textContent = selectedLevel[currentQuestion].answers[index];
    });
}

function checkAnswer(answer) {
    clearInterval(timer); // Stop the timer when an answer is selected

    if (answer === selectedLevel[currentQuestion].correct) {
        score += 10;
        alert('Correct!');
    } else {
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('game-over').classList.remove('hidden');
        return;
    }

    document.getElementById('score').textContent = `Score: ${score}`;

    currentQuestion++;

    if (currentQuestion < selectedLevel.length) {
        loadQuestion();
    } else {
        endGame();
    }
}


function endGame() {
    if (currentQuestion === selectedLevel.length) {
        document.getElementById('quiz').classList.add('hidden'); // Hide the quiz section
        document.getElementById('game-complete').classList.remove('hidden'); // Show the game complete section
        document.getElementById('final-score').textContent = score; // Show the final score
    }
}


function resetGame() {
    score = 0; // Reset the score to 0
    document.getElementById('score').textContent = `Score: ${score}`; // Update the score display
    clearInterval(timer); // Clear the timer
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('game-complete').classList.add('hidden');
}

    
function goToMenu() {
        resetGame(); // Reset the game and go back to the main menu
        document.getElementById('game-complete').classList.add('hidden'); // Hide the game complete screen
        document.getElementById('menu').classList.remove('hidden'); // Show the main menu screen
    }
    
let timer;
let timeLeft = 30; // 30 seconds for each question

function loadQuestion() {
    // Reset the timer for each question
    timeLeft = 30;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    // Start the countdown
    timer = setInterval(updateTimer, 1000);

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');

    questionElement.textContent = selectedLevel[currentQuestion].question;
    const buttons = answersElement.querySelectorAll('button');
    
    buttons.forEach((button, index) => {
        button.textContent = selectedLevel[currentQuestion].answers[index];
    });
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    // Change color based on time left
    if (timeLeft <= 5) {
        document.getElementById('timer').classList.add('danger');
        document.getElementById('timer').classList.remove('warning');
    } else if (timeLeft <= 10) {
        document.getElementById('timer').classList.add('warning');
        document.getElementById('timer').classList.remove('danger');
    } else {
        document.getElementById('timer').classList.remove('warning', 'danger');
    }

    if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        alert('Time is up!');
        checkAnswer(-1); // Check answer as if it was wrong
    }
}
