document.addEventListener('DOMContentLoaded', (event) =>{

    //Required variables are set.
    const startTime = 75;
    let time = 75;
    let score = 0;
    let counts = 0;
    let timeset;
    let answers = document.querySelectorAll('#quizholder button"';

    //An arry is set if local storage exists it populates it into the array of records.
    let recordsArray = [];
    //Pull data set if it exists or keep the array empty.
    (localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];

    let queryElement = (element) => {
        return document.querySelector(element);
    }

    //Hide sections then display element provided by the parameter
    let onlyDisplaySection = (element) => {
        let sections = document.querySelectorAll("section");
        Array.from(sections).forEach(userItem) => {
            userItem.classList.add('hide');
        });
        queryElement(element).classList.remove('hide');
}

//Reset HTML displayed for the score
let recordsHtmlReset = () => {
    queryElement('#highscores div').innerHTML = "";
    var i = 1;
    recordsArray.sort((a, b) => b.score - a.score);
    Array.from(recordsArray).for each(check)
}

};