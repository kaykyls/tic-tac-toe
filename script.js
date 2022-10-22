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
    box[i].addEventListener("click", () => {
        if(!playedBoxes.includes(i) && turn === "X"){
            
            boxesMoves[i] = turn
            
            if(playerWon()) {
                if(thereIsNoWin){
                    displayX(i)
                    displayWinText("X")
                    xWins++
                    xWinsScoreboard.innerText = `X: ${xWins}`
                    thereIsNoWin = false
                    playAgainBTn.classList.remove("hidden")
                }
            } else {
                turn = "O"
                displayX(i)
                changeDisplayTurn(turn)
            }
        }

        else if(!playedBoxes.includes(i) && turn === "O"){
             
            boxesMoves[i] = turn
            
            if(playerWon()){
                if(thereIsNoWin){
                    displayCircle(i)
                    displayWinText("O")
                    oWins++
                    circleWinsScoreboard.innerText = `O: ${oWins}`
                    thereIsNoWin = false
                    playAgainBTn.classList.remove("hidden")
                }
            } else {
                turn = "X"
                displayCircle(i)
                changeDisplayTurn(turn)
            }
        }
    })
}

function changeDisplayTurn(turn) {
    displayTurn.innerHTML = `É a vez de: ${turn}`
}

function displayWinText(turn) {
    displayTurn.innerHTML = `O jogador ${turn} ganhou!`
}

function displayCircle(i) {
    if(playedBoxes.includes(i)){
        return
    }else{
        circle[i].classList.remove("hidden")
        playedBoxes.push(i)
    }
}

function displayX(i) {
    if(playedBoxes.includes(i)){
        return
    }else{
        x[i].classList.remove("hidden")
        playedBoxes.push(i)
    }
}

function winCondition(boxesMoves = [], num1, num2, num3) {
    return boxesMoves[num1] === boxesMoves[num2] && boxesMoves[num2] === boxesMoves[num3] && boxesMoves[num1] !== undefined
}

function playerWon() {
    //vertical
    if(winCondition(boxesMoves, 0, 1, 2)){
        return true
    }

    if(winCondition(boxesMoves, 3, 4, 5)){
        return true
    }
    
    if(winCondition(boxesMoves, 6, 7, 8)){
        return true
    }

    //horizontal
    if(winCondition(boxesMoves, 0, 3, 6)){
        return true
    }
    
    if(winCondition(boxesMoves, 1, 4, 7)){
        return true
    }
    
    if(winCondition(boxesMoves, 2, 5, 8)){
        return true
    }

    //diagonal
    if(winCondition(boxesMoves, 0, 4, 8)){
        return true
    }
    
    if(winCondition(boxesMoves, 2, 4, 6)){
        return true
    }
}

playAgainBTn.addEventListener("click", () => {
    playAgainBTn.classList.add("hidden")
    playedBoxes = []
    boxesMoves = []
    for(let i = 0; i < box.length; i++){
        circle[i].classList.add("hidden")
        x[i].classList.add("hidden")
    }
    displayTurn.innerHTML = `É a vez de: X`
    thereIsNoWin = true
})