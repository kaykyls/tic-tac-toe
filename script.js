const box = document.querySelectorAll(".container div")
const displayTurn = document.querySelector(".turn p")
const xWinsScoreboard = document.querySelector(".scoreboard p:nth-child(1)")
const circleWinsScoreboard = document.querySelector(".scoreboard p:nth-child(2)")
const playAgainBTn = document.querySelector(".play-again-btn")

console.log(box)

let moves = []

let player1 = {
    wins: 0,
    move: "X"
}

let player2 = {
    wins: 0,
    move: "O"
}

let turn = player1.move

let previousFirstTurn

box.forEach((box, index) => {
    box.onclick = () => {
        if(moves[index] === undefined && !checkWin()) {
            const move = document.createElement("p")
            box.append(move)
            move.innerHTML = turn
            moves[index] = turn
            changeTurn()

            checkWin()
            checkDraw()
        }
    }
})

const changeTurn = () => {
    turn === "X" ? turn = "O" : turn = "X"
}

const checkWin = () => {
    for(let sequence of winSequences) {
        if(winCondition(moves, sequence)) {
            playAgainBTn.classList.remove("hidden")
            return true
        } 
    }
}

const checkDraw = () => {
    if (moves.length === 9) {
        playAgainBTn.classList.remove("hidden")
    }
}

const winCondition = (boxesMoves = [], num = []) => {
    // console.log(boxesMoves, num)
    return boxesMoves[num[0]] === boxesMoves[num[1]] && boxesMoves[num[1]] === boxesMoves[num[2]] && boxesMoves[num[0]] !== undefined
}

const winSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

function resetGame() {
    box.forEach(box => {
        if(box.querySelector("p")) {
            box.querySelector("p").remove()
        }
    })

    moves = []
    playAgainBTn.classList.add("hidden")

    turn = "X"
    // updateTurnMessage(turn)
}

playAgainBTn.onclick = resetGame