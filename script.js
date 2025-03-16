const quizData = [
    {
        question: "Never Eat Shredded Wheat",
        options: [
            "compass directions",
            "ancient grains",
            "Allied powers in World War II",
            "Presidents remembered on Mount Rushmore"
        ],
        correctAnswer: 0,
        hint: "Starting at the top and going clockwise, compass directions are north, east, south, and west."
    },
    {
        question: "ROY G. BIV",
        options: [
            "what to do in case of fire",
            "organizational technique",
            "colors of the rainbow",
            "organ systems of the human body"
        ],
        correctAnswer: 2,
        hint: "Starting from the outside and working inward, a rainbow's colors are traditionally: red, orange, yellow, green, blue, indigo, and violet."
    },
    {
        question: "Every Good Boy Does Fine",
        options: [
            "piano finger positions",
            "lines of the treble clef",
            "steps in scientific method",
            "planets in order from the sun"
        ],
        correctAnswer: 1,
        hint: "This helps musicians remember the notes on the lines of the treble clef: E, G, B, D, F."
    },
    {
        question: "Please Excuse My Dear Aunt Sally",
        options: [
            "order of operations in math",
            "planets in our solar system",
            "Great Lakes from west to east",
            "steps in photosynthesis"
        ],
        correctAnswer: 0,
        hint: "This helps remember the order of operations in mathematics: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction."
    },
    {
        question: "King Philip Came Over For Good Soup",
        options: [
            "presidents in order of service",
            "taxonomic classification system",
            "layers of the atmosphere",
            "bones in the human hand"
        ],
        correctAnswer: 1,
        hint: "This helps remember the taxonomic classification system: Kingdom, Phylum, Class, Order, Family, Genus, Species."
    },
    {
        question: "My Very Eager Mother Just Served Us Nachos",
        options: [
            "parts of a cell",
            "types of clouds",
            "planets in our solar system",
            "bones of the skull"
        ],
        correctAnswer: 2,
        hint: "This helps remember the planets in order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
    },
    {
        question: "HOMES",
        options: [
            "Great Lakes",
            "types of government",
            "parts of the brain",
            "stages of mitosis"
        ],
        correctAnswer: 0,
        hint: "This helps remember the five Great Lakes: Huron, Ontario, Michigan, Erie, Superior."
    },
    {
        question: "FANBOYS",
        options: [
            "types of literary conflict",
            "coordinating conjunctions",
            "parts of speech",
            "types of chemical reactions"
        ],
        correctAnswer: 1,
        hint: "This helps remember the seven coordinating conjunctions: For, And, Nor, But, Or, Yet, So."
    },
    {
        question: "IPMAT",
        options: [
            "steps in the scientific method",
            "stages of mitosis",
            "layers of the Earth's atmosphere",
            "types of chemical bonds"
        ],
        correctAnswer: 1,
        hint: "This helps remember the stages of mitosis: Interphase, Prophase, Metaphase, Anaphase, Telophase."
    },
    {
        question: "PEMDAS",
        options: [
            "order of operations in math",
            "steps in cellular respiration",
            "types of literary devices",
            "parts of a plant cell"
        ],
        correctAnswer: 0,
        hint: "This helps remember the order of operations in mathematics: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answeredQuestions = [];
let timeBonus = 0;
let startTime;
let endTime;

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const currentScoreEl = document.getElementById('current-score');
const hintText = document.getElementById('hint-text');
const finalScoreEl = document.querySelector('.final-score');
const playAgainBtns = document.querySelectorAll('.play-again-btn');
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');
const answersListEl = document.querySelector('.answers-list');

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    answeredQuestions = [];
    timeBonus = 0;
    totalQuestionsEl.textContent = quizData.length;
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', goToNextQuestion);
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    playAgainBtns.forEach(btn => {
        btn.addEventListener('click', resetQuiz);
    });
}

function startQuiz() {
    startScreen.classList.add('d-none');
    questionScreen.classList.remove('d-none');
    startTime = new Date();
    loadQuestion();
}

function loadQuestion() {
    currentQuestionEl.textContent = currentQuestion + 1;
    const questionData = quizData[currentQuestion];
    questionTitle.textContent = questionData.question;
    hintText.textContent = questionData.hint;
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', () => selectOption(optionElement, index));
        optionsContainer.appendChild(optionElement);
    });
    nextBtn.disabled = true;
}

function selectOption(optionElement, optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.classList.remove('correct');
        opt.classList.remove('incorrect');
    });
    optionElement.classList.add('selected');
    selectedOption = optionIndex;
    const questionData = quizData[currentQuestion];
    const isCorrect = selectedOption === questionData.correctAnswer;
    if (isCorrect) {
        optionElement.classList.add('correct');
        score += 100;
        currentScoreEl.textContent = score;
    } else {
        optionElement.classList.add('incorrect');
        options[questionData.correctAnswer].classList.add('correct');
    }
    answeredQuestions.push({
        question: questionData.question,
        selectedOption: optionIndex,
        correctOption: questionData.correctAnswer,
        isCorrect: isCorrect,
        options: questionData.options
    });
    nextBtn.disabled = false;
}

function goToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        selectedOption = null;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    timeBonus = Math.max(0, Math.floor(500 - (timeTaken / 2)));
    const totalScore = score + timeBonus;
    finalScoreEl.textContent = `${score / 100}/${quizData.length}`;
    document.querySelectorAll('.score-value').forEach(el => {
        el.textContent = totalScore;
    });
    populateAnswersTab();
    questionScreen.classList.add('d-none');
    resultsScreen.classList.remove('d-none');
}

function populateAnswersTab() {
    answersListEl.innerHTML = '';
    answeredQuestions.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answer-item');
        const questionNumber = document.createElement('div');
        questionNumber.classList.add('answer-question');
        questionNumber.textContent = `${index + 1}. ${answer.question}`;
        const optionsList = document.createElement('div');
        optionsList.classList.add('answer-options');
        answer.options.forEach((option, optIndex) => {
            const optionItem = document.createElement('div');
            optionItem.classList.add('answer-option');
            const icon = document.createElement('i');
            if (optIndex === answer.correctOption) {
                icon.classList.add('fas', 'fa-check');
                optionItem.classList.add('correct-answer');
            } else if (optIndex === answer.selectedOption && !answer.isCorrect) {
                icon.classList.add('fas', 'fa-times');
                optionItem.classList.add('incorrect-answer');
            } else {
                icon.classList.add('fas', 'fa-circle');
                icon.style.opacity = '0.3';
            }
            optionItem.appendChild(icon);
            const optionText = document.createElement('span');
            optionText.textContent = option;
            optionItem.appendChild(optionText);
            optionsList.appendChild(optionItem);
        });
        answerItem.appendChild(questionNumber);
        answerItem.appendChild(optionsList);
        answersListEl.appendChild(answerItem);
    });
}

function resetQuiz() {
    resultsScreen.classList.add('d-none');
    startScreen.classList.remove('d-none');
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    answeredQuestions = [];
    currentScoreEl.textContent = score;
    tabs[0].click();
}

document.addEventListener('DOMContentLoaded', initQuiz);
