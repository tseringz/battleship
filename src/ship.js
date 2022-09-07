/* eslint-disable no-plusplus */
function generateShip(shipLength) {
  const ship = {
    length: shipLength,
    counter: [],
    position: [],
    hit: function (hitCoordinate) {
      if (this.counter.length < shipLength) {
        this.counter.push(hitCoordinate);
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

const newShip = generateShip(4);

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
  const attackCoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i] === 'C') {
      const biggestShip = generateShip(5);
      for (let j = 0; j < biggestShip.ship.length; j++) {
        biggestShip.ship.position.push(coordinates[i]);
        i++;
      }
      console.log(biggestShip.ship.position);
    }
  }

  function receiveAttack() {
    for (let i = 0; i < coordinates.length; i++) {
      if (true) {
        attackCoordinates.push(coordinates[i]);
      }
    }
    console.log(attackCoordinates);
  }
  receiveAttack();
}

gameBoard();
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 4; i++) {
  console.log(newShip.ship.hit(), newShip.ship.isSunk(), newShip.ship.counter);
}

module.exports = generateShip;
