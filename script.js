var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn");
var timeLeft = document.getElementById(questions.length * 15 +1);
var timerEl = document.getElementById("timer");
var finalSubmit = document.querySelector("#final-submit");
var userScoreEl = document.getElementById("user-score");
var UserNameInput;
var questionList = document.getElementById("question");
var answerOptions = document.getElementById("answers");


var questionNumber = -1
var answer;

//Quiz Questions
var questions = [
    {
        title: "What does CSS stand for?",
        choices: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },

    {
        title: "Who is making the Web standards?",
        choices: ["Mozilla", "Microsoft", "Google", "The World Wide Web Consortium"],
        answer: "The World Wide Web Consortium"
    },

    {
        title: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        choices: ["longdesc", "src", "title", "alt"],
        answer: "alt"
    }, 

    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
        answer: "<script>"
    },

    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onmouseover", "onmouseclick", "onclick", "onchange"],
        answer: "onclick"
    },

    {
        title: "Which operator is used to assign a value to a variable?",
        choices: ["x", "!", "&", "="],
        answer: "="
    }
];

function startTimer() {
    //change welcome message with questions
    document.getElementById("kickoff");
    document.getElementById("quiz");

    //time set, count down begins
    setTimer();
    //create questions
    makeQuestions();
}

function setTimer(){
    var countdown = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if(timeLeft === 0 || questionNumber === questions.length){
            clearInterval(countdown);
            setTimeout(displayScore, 500),
        }
    }, 1000);
}

funbction makeQuestions(){
    questionNumber++;
    answer = questions[questionNumber].answer

    questionsList.textContent = questions[questionNumber].title;
    answerOptions.innerHTML = "";

    var choices = questions[questionNumber].choices

    for (var i = 0; i < choices.length; i++)
    {
        var nextChoice = document.createElement("button");
        nextChoice.textContent = choices[i]
        answerBtn = answerChoices.appendChhild(nextChoice).setAttribute("class");
    }
}