const quiz = [
    {
        question: "Which language runs in a web browser?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Desktop Oriented Mode"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which keyword declares a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which HTML tag links JavaScript?",
        options: ["<style>", "<script>", "<link>", "<js>"],
        answer: "<script>"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
    clearInterval(timer);

    timeLeft = 15;
    timerEl.textContent = timeLeft;

    startTimer();

    const q = quiz[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => checkAnswer(btn, option));

        optionsEl.appendChild(btn);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            disableButtons();
        }
    }, 1000);
}

function checkAnswer(button, selected) {
    clearInterval(timer);

    const correct = quiz[currentQuestion].answer;

    [...optionsEl.children].forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correct) {
            btn.classList.add("correct");
        }
    });

    if (selected === correct) {
        score++;
        scoreEl.textContent = score;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
}

function disableButtons() {
    const correct = quiz[currentQuestion].answer;

    [...optionsEl.children].forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correct) {
            btn.classList.add("correct");
        }
    });
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    clearInterval(timer);

    document.getElementById("quiz-container").classList.add("hidden");
    nextBtn.classList.add("hidden");

    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your Score: <strong>${score}</strong> / ${quiz.length}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
}

loadQuestion();