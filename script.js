document.addEventListener('DOMContentLoaded', (event) => {


	//Initial required variables set.
	const initialTime = 75;
	let time = 75;
	let score = 0;
	let Counts = 0;
	let timeset;
	let answers = document.querySelectorAll('#quizHolder button');

	//An array is set, if local storage exists it is generated into the array of records.
	let recordsArray = [];
	//Pull data if it exists or keep empty array.
	(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];


	let queryElement = (element) => {
		return document.querySelector(element);
	}

	//Hide all sections then unhide the element provided by the parameter.
	let onlyDisplaySection = (element) => {
		let sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}

	//Reset HTML display for the score.
	let recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}

	//Set questions
	let setQuestionData = () => {
		queryElement('#quizHolder p').innerHTML = questions[Counts].title;
		queryElement('#quizHolder button:nth-of-type(1)').innerHTML = `1. ${questions[Counts].choices[0]}`;
		queryElement('#quizHolder button:nth-of-type(2)').innerHTML = `2. ${questions[Counts].choices[1]}`;
		queryElement('#quizHolder button:nth-of-type(3)').innerHTML = `3. ${questions[Counts].choices[2]}`;
		queryElement('#quizHolder button:nth-of-type(4)').innerHTML = `4. ${questions[Counts].choices[3]}`;
	}

	//Rolls through the question and has a parameter to control the right or wrong text.
	let quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add('disable');
		});

		// If all the questions have been answered leave the quiz section
		setTimeout(() => {
			if (Counts === questions.length) {
				onlyDisplaySection("#finish");
				time = 0;
				queryElement('#time').innerHTML = time;
			} else {
				// Updates copy in questions with the net array's question text.
				setQuestionData();
				// Removed disabled status.
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}

	//Handles time related events for the quiz
	let myTimer = () => {
		if (time > 0) {
			time = time - 1;
			queryElement('#time').innerHTML = time;
		} else {
			clearInterval(clock);
			queryElement('#score').innerHTML = score;
			onlyDisplaySection("#finish");
		}
	}


	// On intro button click start time and starts giving questions
	let clock;
	queryElement("#intro button").addEventListener("click", (e) => {
		//call above function to set Initial data in questionHolder section
		setQuestionData();
		onlyDisplaySection("#quizHolder");
		clock = setInterval(myTimer, 1000);
	});

	// Clears timeout if next question is answered before current timeout is reached or if form element has a requirement not met.
    let scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}


	// Create an array of selected divs so I can refer to them with the this keyword and replace their values to then check against the answer property for all questions.
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			// Handles events if a question is answered correctly
			if (this.innerHTML.substring(3, this.length) === questions[Counts].answer) {
				score = score + 1;
				Counts = Counts + 1;
				quizUpdate("Correct");
			}else{
				// Handles events if a question is answered incorrectly.
				time = time - 10;
				Counts = Counts + 1;
				quizUpdate("Wrong");
			}
		});
	});

	

	//Displays error message if initials given do not meet requirements
	let errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
			queryElement('#errorIndicator').classList.add('invisible');
		}, 3000);
	}

	//Error handling for submitted high scores
	queryElement("#records button").addEventListener("click", () => {
		let initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "You need at least 1 character";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else if (initialsRecord.match(/[[A-Za-z]/) === null) {
			queryElement('#errorIndicator p').innerHTML = "Only letters for initials allowed.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else if (initialsRecord.length > 5) {
			queryElement('#errorIndicator p').innerHTML = "Maximum of 5 characters allowed.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else {
			//Sends value to current array for use now.
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			//Sends value to local storage for later use.
			localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
		}
	});


	// Clears highscores from the html, array and localstorage.
	queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('recordsArray');
	});

	//Resets all quiz settings to the default to replay the quiz.
	queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
        Counts = 0;
		onlyDisplaySection("#intro");
	});

	// If a player pushes the view high scores button in the html view then the quiz progress is lost and allows them to view the high scores.
	queryElement("#scores").addEventListener("click", (e) => {
		e.preventDefault();
		clearInterval(clock);
		queryElement('#time').innerHTML = 0;
		time = initialTime;
		score = 0;
		Counts = 0;
		onlyDisplaySection("#highScores");
		recordsHtmlReset();
	});

});