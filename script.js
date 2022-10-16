const box = document.querySelectorAll(".container div")
const x = document.querySelectorAll(".container div p:nth-child(1)")
const circle = document.querySelectorAll(".container div p:nth-child(2)")
const displayTurn = document.querySelector(".turn h2")

let turn = "X";
let playedBoxes = []
let boxesMoves = []
let won

displayTurn.innerHTML += `${turn}`

for(let i = 0; i < box.length; i++){
    box[i].addEventListener("click", () => {
        if(!playedBoxes.includes(i) && turn === "X"){
            displayX(i)

            boxesMoves[i] = turn
            turn = "O"

            changeDisplayTurn(turn)
            if(playerWon()) {
                displayWinText("X")
            }

        }
        else if(!playedBoxes.includes(i) && turn === "O"){
            displayCircle(i)
                        
            boxesMoves[i] = turn
            turn = "X"
            
            changeDisplayTurn(turn)
            if(playerWon()) {
                displayWinText("O")
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
        circle[i].classList.remove("hidden");
        playedBoxes.push(i)
    }
}

function displayX(i) {
    if(playedBoxes.includes(i)){
        return
    }else{
        x[i].classList.remove("hidden");
        playedBoxes.push(i)
    }
}

console.log(boxesMoves[0])

function winCondition(boxesMoves = [], num1, num2, num3) {
    return boxesMoves[num1] == boxesMoves[num2] && boxesMoves[num2] == boxesMoves[num3] && boxesMoves[num1] !== undefined
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