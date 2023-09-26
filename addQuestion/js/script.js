let questionText = document.getElementById("questionText");
let answerOptions = document.getElementById("answerOptions");
let nextButton = document.getElementById("nextButton");
let resultContainer = document.getElementById("resultContainer");
let addQuestionBtn = document.getElementById("addQuestionBtn");

let txtQuestion = document.querySelector("#txtQuestion");
let txtOptions = document.querySelectorAll(".form-control.options");
let txtAnswer = document.querySelector("#txtAnswer");
let saveBtn = document.querySelector("#saveBtn");

if (saveBtn != undefined) {
    saveBtn.addEventListener("click", addQuestion);
}

if (addQuestion != undefined) {
    addQuestionBtn.addEventListener("click", function () {
        location.href = "add Question.html";
    })
}

function addQuestion() {
    if (checkFields()) {
        let question = txtQuestion.value;
        let options = [];
        txtOptions.forEach(option => {
            options.push(option.value);
        });
        let correctAnswer = txtAnswer.value;

        if (localStorage.getItem("quizData") == null) {
            let quizData = [];
            quizData.push({
                question: question,
                options: options,
                correctAnswer: correctAnswer
            });

            localStorage.setItem("quizData", JSON.stringify(quizData));
            resultContainer.innerHTML = "Question saved successfully";
        } else {
            let quizData = JSON.parse(localStorage.getItem("quizData"));
            quizData.push({
                question: question,
                options: options,
                correctAnswer: correctAnswer
            });

            localStorage.setItem("quizData", JSON.stringify(quizData));
            resultContainer.innerHTML = "Question saved successfully";
        }
    } else {
        resultContainer.innerHTML = "All fields are required";
    }
}

function checkFields() {
    let inputFields = document.querySelectorAll('input[type="text"]');
    let flag = true;
    inputFields.forEach(input => {
        if (input.value == "") {
            flag = false;
        }
    })
    return flag;
}

function fetchQuestion() {
    let quizData = localStorage.getItem("quizData");
    if (quizData != null) {
        return JSON.parse(quizData);
    } else {
        return [];
    }
}

const quizData = fetchQuestion();
console.log(quizData);



const mixedQuestions = [];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestions() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;

    answerOptions.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.innerHTML = option;
        li.addEventListener("click", checkAnswer);

        answerOptions.appendChild(li);
    });
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
        score++;
    } else {
        mixedQuestions.push(quizData[currentQuestionIndex]);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestions();
    } else {
        showResult();
    }
}

function showResult() {
    questionText.innerHTML = "";
    answerOptions.innerHTML = "";
    nextButton.style.display = "none";
    resultContainer.innerHTML = `Your Score: ${score} out of ${quizData.length} <br>`;

    if (mixedQuestions.length > 0) {
        resultContainer.innerHTML += `You missed ${mixedQuestions.length} questions.<br>`;
        mixedQuestions.forEach(q => {
            resultContainer.innerHTML += `<br>${q.question} Correct answer is: ${q.correctAnswer}`;
        })
    }


}


loadQuestions();














