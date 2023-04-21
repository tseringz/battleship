const generateShip = require('./ship');
const gameBoard = require('./gameBoard');


function Players() {
    let playerOne = true;
    let computer = Math.floor(Math.random() * 100);
    const randomArray = [];

   function playerTurn() {
    playerOne = false;
    if(playerOne === false) {
        computer = Math.floor(Math.random() * 100);
    while(randomArray.includes(computer)) {
        computer = Math.floor(Math.random() * 100);
    }
    randomArray.push(computer);
    playerOne = true;
   }
    
   }

 return {playerOne, computer, playerTurn, randomArray}

}

module.exports = Players;