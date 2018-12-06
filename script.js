const page = {
    score: {
        computer: "computer-score",
        user: "user-score"
    },
    result: {
        verdict: "result-verdict",
        computerChoise: "computer-choice",
        userChoise: "user-choice",
        title: "choice-title",
        lastResult: "last-result",
        lastResultComputer: "last-result-computer",
        lastResultUser: "last-result-user",
    },
    choice: {
        choiceClass: "single-choice",
        choiceAttr: "data-choice"
    },
    block:{
        result:"result-block",
        game:"game-block"
    }
}

const choicesArray = ['r', 'p', 's'];
const resultArray = {
    win: ['rp', 'sr', 'ps'],
    lose: ['pr', 'rs', 'sp'],
    draw: ['rr', 'pp', 'ss']
}
const label = {
    r: "Kamień",
    s: "Nożyczki",
    p: "Papier",
    lose: "Przegrana :-(",
    win: "Zwycięstwo !",
    draw: "Remis"
}
let score = {
    user: 0,
    computer: 0,
    winPoints: 10
}

let onUserClick = function () {
    let context = this;
    showChoiceTitle();
    let computerChoiceValue = computerChoice();
    let userChoiceValue = userChoice(context);
    let checkWinnerValue = checkWinner(computerChoiceValue, userChoiceValue);
    resolveWinner(computerChoiceValue, userChoiceValue, checkWinnerValue);
}

function resolveWinner(computerChoiceValue, userChoiceValue, checkWinnerValue) {
    resolveTitles(computerChoiceValue, userChoiceValue, checkWinnerValue);    
    addPoint(checkWinnerValue);
    checkIfYouWinOrLose();
}

function checkIfYouWinOrLose(){
    if(score.user == score.winPoints || score.computer == score.winPoints){
        console.log(score.user > score.computer);
        if(score.user > score.computer){
            document.getElementById(page.result.lastResult).innerHTML = label.win;        
        }else{
            document.getElementById(page.result.lastResult).innerHTML = label.lose;
        }
        document.getElementById(page.block.game).style.display = "none";                
        document.getElementById(page.block.result).style.display = "block";
        document.getElementById(page.result.lastResultComputer).innerHTML = score.computer;
        document.getElementById(page.result.lastResultUser).innerHTML = score.user;
        
    }
}
function resolveTitles(computerChoiceValue, userChoiceValue, checkWinnerValue) {
    document.getElementById(page.result.computerChoise).innerHTML = label[computerChoiceValue];
    document.getElementById(page.result.userChoise).innerHTML = label[userChoiceValue]; 
    document.getElementById(page.result.verdict).innerHTML = label[checkWinnerValue];   
}

function addPoint(checkWinnerValue) {
    switch (checkWinnerValue) {
        case "win":
            console.log("win");
            score.user += 1;
            break;
        case "lose":
            console.log("lose");
            score.computer += 1;
            break;
    }
    refreshPoints();
}

function refreshPoints() {
    document.getElementById(page.score.computer).innerHTML = score.computer;
    document.getElementById(page.score.user).innerHTML = score.user;
}

function checkWinner(computer, user) {
    var computerUserValue = computer + user;
    for (var key in resultArray) {
        if (resultArray[key].includes(computerUserValue)) {
            return key;
        }
    }
}

function showChoiceTitle() {
    document.getElementById(page.result.title).style.display = "block";
}

function userChoice(context) {
    return context.getAttribute(page.choice.choiceAttr);
}

function computerChoice() {
    return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

function bindUserChoice() {
    var choiceElements = document.getElementsByClassName(page.choice.choiceClass)
    Array.from(choiceElements).forEach(function (element) {
        element.addEventListener('click', onUserClick);
    });
}


function main() {
    bindUserChoice();
}

main();