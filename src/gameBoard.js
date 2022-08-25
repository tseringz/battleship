/* eslint-disable no-plusplus */
function generateShip(shipLength) {
  const ship = {
    length: shipLength,
    counter: [],
    position: [],
    hit: function () {
      if (this.counter.length < shipLength) {
        this.counter.push('hit');
      }
      return this.counter.length;
    },
    isSunk: function () {
      if (this.counter.length === shipLength) {
        return true;
      }
      return false;
    },
  };
  return { ship };
}

function gameBoard() {
  const coordinates = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];
  const alphabet = 'A';
  const newCoordinates = [];
  for (let i = 1; i <= 10; i++) {
    const letters = String.fromCharCode(alphabet.charCodeAt(0) + (i - 1));
    for (let j = 1; j <= 10; j++) {
      newCoordinates.push([letters, j]);
    }
  }

  return { newCoordinates };
}

const attackCoordinates = JSON.stringify(['F', 3]);
const newShip = generateShip(4);
const newGameBoard = gameBoard();
console.log(newGameBoard.newCoordinates[0]);
for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
  if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
    for (let j = 0; j < newShip.ship.length; j++) {
      newShip.ship.position.push(newGameBoard.newCoordinates[i]);
      i++;
    }
  }
}
console.log(newShip.ship.position);
module.exports = gameBoard;
