const box = document.querySelectorAll(".container div")
const x = document.querySelectorAll(".container div p:nth-child(1)")
const circle = document.querySelectorAll(".container div p:nth-child(2)")
const displayTurn = document.querySelector(".turn p")
const xWinsScoreboard = document.querySelector(".scoreboard p:nth-child(1)")
const circleWinsScoreboard = document.querySelector(".scoreboard p:nth-child(2)")
const playAgainBTn = document.querySelector(".play-again-btn")

console.log(box)

const moves = ["", "", "", "", "", "", "", "", ""]

let player1 = {
    wins: 0,
    move: ""
}

let player2 = {
    wins: 0,
    move: ""
}

let turn = "X"

box.forEach((box, index) => {
    box.onclick = () => {
        if(moves[index] === "") {
            const move = document.createElement("p")
            box.append(move)
            move.innerHTML = turn
            moves[index] = turn
            changeTurn()
            if(checkWin()) {
                console.log(moves)
            }
        }
    }
})

const changeTurn = () => {
    turn === "X" ? turn = "O" : turn = "X"
}

const checkWin = () => {
    for(let sequence of winSequences) {
        if(winCondition(moves, sequence)) return true
        // console.log(sequence)
    }
}

const winCondition = (boxesMoves = [], num = []) => {
    // console.log(boxesMoves, num)
    return boxesMoves[num[0]] === boxesMoves[num[1]] && boxesMoves[num[1]] === boxesMoves[num[2]] && boxesMoves[num[0]] !== ""
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