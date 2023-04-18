const generateShip = require('./ship');
const gameBoard = require('./gameBoard');


function Players() {
    let playerOne = true;
    let computer = Math.floor(Math.random() * 100);
    const randomArray = [];

   function playerTurn() {
    playerOne = false;
    computer = Math.floor(Math.random() * 100);
    while(randomArray.includes(computer)) {
        computer = Math.floor(Math.random() * 100);
    }
    randomArray.push(computer);
   }

 return {playerOne, computer, playerTurn, randomArray}

}

const newPlayer = Players();

for(let i = 0; i < 100; i++) {
    newPlayer.playerTurn();
}

function findDuplicates(arr) {
    return arr.filter((currentValue, currentIndex) =>
    arr.indexOf(currentValue) !== currentIndex);
 }
 const newArray = findDuplicates(newPlayer.randomArray);
console.log(newPlayer.randomArray);
console.log(newArray)

module.exports = Players;