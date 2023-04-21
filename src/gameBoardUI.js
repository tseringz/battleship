const gameBoard = require('./gameBoard');
const Players = require('./player');

function gameStart() {
const newPlayers = Players();
const newGameBoard = gameBoard();

const playerBoard = document.querySelector('.player-board');
const computerBoard = document.querySelector('.computer-board');
let newGrid;

for(let i = 0; i < 100; i++) {
newGrid = document.createElement('button');
newGrid.value = `${newGameBoard.coordinates[i]}`;
newGrid.classList.add('player-grid');
newGrid.style.border = '0.5px solid black';
playerBoard.appendChild(newGrid);
}

for(let i = 0; i < 100; i++) {
    newGrid = document.createElement('button');
    newGrid.value = `${newGameBoard.coordinates[i]}`;
    newGrid.classList.add('computer-grid');
    newGrid.style.border = '0.5px solid black';
    computerBoard.appendChild(newGrid);
    }

    return {newPlayers}
}

function gameModal() {
    const newGame = gameStart();
    const playerBoardGrids = Array.from(document.querySelectorAll('.player-grid'));
    const computerBoardGrids = document.querySelectorAll('.computer-grid');

 computerBoardGrids.forEach(computerBoardGrid => {
    computerBoardGrid.addEventListener('click', (e) =>{
        console.log('clicked');
        newGame.newPlayers.playerTurn();
        console.log(newGame.newPlayers.randomArray);
        if(computerBoardGrid.value === 'null') {
            computerBoardGrid.style.backgroundColor = "blue";
        } else {
            computerBoardGrid.style.backgroundColor = "red";
        }
        computerTurn();
    })
 })
 
 function computerTurn() {
  for(let i = 0; i < playerBoardGrids.length; i++) {
    for(let j = 0; j < newGame.newPlayers.randomArray.length; j++) {
        if(playerBoardGrids[newGame.newPlayers.randomArray[j]].value === 'null') {
            playerBoardGrids[newGame.newPlayers.randomArray[j]].style.backgroundColor = "blue";
        } else {
            playerBoardGrids[newGame.newPlayers.randomArray[j]].style.backgroundColor = "red";
        }
    }
  }
}
}

export {gameStart, gameModal};