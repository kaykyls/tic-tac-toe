const box = document.querySelectorAll(".container div")
const x = document.querySelectorAll(".container div p:nth-child(1)")
const circle = document.querySelectorAll(".container div p:nth-child(2)")
const displayTurn = document.querySelector(".turn p")
const xWinsScoreboard = document.querySelector(".scoreboard p:nth-child(1)")
const circleWinsScoreboard = document.querySelector(".scoreboard p:nth-child(2)")
const playAgainBTn = document.querySelector(".play-again-btn")

let turn = "X";
let playedBoxes = []
let boxesMoves = []
let thereIsNoWin = true
let xWins = 0
let oWins = 0

displayTurn.innerHTML += `${turn}`

for(let i = 0; i < box.length; i++){
    handleClick(i)
}

function handleClick(i) {
    box[i].addEventListener("click", () => {
        if(!playedBoxes.includes(i)){
            boxesMoves[i] = turn
            if(playerWon()) {
                if(thereIsNoWin){
                    updateDisplay(turn, i)
                    displayWinText(turn)
                    updateWinsDisplay(turn)
                    displayPlayAgainButton()
                    thereIsNoWin = false
                }
            } else {
                updateDisplay(turn, i)
                changeTurn()
                updateTurnMessage(turn)
                if(playedBoxes.length === 9){
                    displayTurn.innerHTML = "Deu velha!"
                    displayPlayAgainButton()
                }
            }
        }
    })
}

function changeTurn() {
    if(turn === "X"){
        turn = "O"
    } else if(turn === "O"){
        turn = "X"
    }
}

function updateTurnMessage(turn) {
    displayTurn.innerHTML = `É a vez de: ${turn}`
}

function displayWinText(turn) {
    displayTurn.innerHTML = `O jogador ${turn} ganhou!`
}

function updateDisplay(turn, i) {
    if(turn === "X" && !playedBoxes.includes(i)){
        x[i].classList.remove("hidden")
        playedBoxes.push(i)
    } else if(turn === "O" && !playedBoxes.includes(i)){
        circle[i].classList.remove("hidden")
        playedBoxes.push(i)
    }
}

function updateWinsDisplay(turn) {
    if(turn === "X"){
        xWins++
        xWinsScoreboard.innerText = `${turn}: ${xWins}`
    } else if(turn === "O"){
        oWins++
        circleWinsScoreboard.innerText = `${turn}: ${oWins}`
    }
}

function displayPlayAgainButton() {
    playAgainBTn.classList.remove("hidden")
}

const winSequences = {
    hor1: [0, 1, 2],
    hor2: [3, 4, 5],
    hor3: [6, 7, 8],

    ver1: [0, 3, 6],
    ver2: [1, 4, 7],
    ver3: [2, 5, 8],

    diag1: [0, 4, 8],
    diag2: [2, 4, 6]
}

function playerWon() {
    for(let sequence in winSequences) {
        if(winCondition(boxesMoves, winSequences[sequence])) return true
    }
}

function winCondition(boxesMoves = [], num = []) {
    return boxesMoves[num[0]] === boxesMoves[num[1]] && boxesMoves[num[1]] === boxesMoves[num[2]] && boxesMoves[num[0]] !== undefined
}

function resetGame() {
    for(let i = 0; i < box.length; i++){
        circle[i].classList.add("hidden")
        x[i].classList.add("hidden")
    }
    playedBoxes = []
    boxesMoves = []
    playAgainBTn.classList.add("hidden")
    turn = "X"
    updateTurnMessage(turn)
    thereIsNoWin = true
}

playAgainBTn.addEventListener("click", resetGame)