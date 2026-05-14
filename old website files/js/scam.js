const scamQuestions = [
    {
        scenario: "You receive an SMS saying: 'Your bank account will be blocked today. Click this link immediately to verify your details.'",
        correctAnswer: "Unsafe",
        explanation: "This is unsafe because scam messages often create urgency and ask you to click suspicious links. Always check directly through your official banking app or website."
    },
    {
        scenario: "A caller says they are from your bank and asks for your OTP to stop a fraudulent transaction.",
        correctAnswer: "Unsafe",
        explanation: "This is unsafe because banks never ask for your OTP, PIN, or password over a call. Sharing OTP can give scammers access to your account."
    },
    {
        scenario: "A friend sends you a payment request link, but the website address looks slightly different from the real UPI or payment app website.",
        correctAnswer: "Unsafe",
        explanation: "This is unsafe because fake websites often look similar to real ones. Always verify the web address carefully and avoid entering details on suspicious pages."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startScamQuiz() {
    document.getElementById("scam-start-screen").style.display = "none";
    document.getElementById("scam-quiz-screen").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    document.getElementById("question-number").innerText = currentQuestionIndex + 1;
    document.getElementById("scenario-text").innerText = scamQuestions[currentQuestionIndex].scenario;
    document.getElementById("scam-feedback").innerText = "";
    document.getElementById("scam-explanation").style.display = "none";
    document.getElementById("scam-explanation").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(userAnswer) {
    let feedback = document.getElementById("scam-feedback");
    let explanationBox = document.getElementById("scam-explanation");
    let nextBtn = document.getElementById("next-btn");

    if (userAnswer === scamQuestions[currentQuestionIndex].correctAnswer) {
        feedback.innerText = "✅ Correct! Good job spotting the scam.";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.innerText = "❌ Not quite. This situation is unsafe.";
        feedback.style.color = "red";
    }

    explanationBox.innerText = scamQuestions[currentQuestionIndex].explanation;
    explanationBox.style.display = "block";
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < scamQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("scam-quiz-screen").style.display = "none";
    document.getElementById("scam-result-screen").style.display = "block";
    document.getElementById("final-score").innerText = score;
}

function restartScamQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("scam-result-screen").style.display = "none";
    document.getElementById("scam-start-screen").style.display = "block";
}