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

var questions = [
    {
        title: "What is the correct syntax for referring to an external script called "xxx.js"?",
        choices: ["<script href="xxx.js">", "<script name="xxx.js">", "<script src="xxx.js">"],
        answer: "<script src="xxx.js">"
    }
];