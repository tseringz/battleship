const generateShip = require('./ship');

const missedCoordinates = [];
const occupiedCoordinates = [];



function gameBoard() {
  let coordinates = [];
  let misAttacks = [];
  let direction = 'Horizontal';
  let ship1 = generateShip(5);
  function generateCoordinates() {
    for (let i = 0; i < 100; i++) {
      coordinates.push(null);
    }
  }
  generateCoordinates();

  
  function placeShip(ship, coordinate) {
    if(direction === "Horizontal") {
      for (let i = coordinate; i < coordinate + ship.ship.length; i++) {
        ship.ship.position.push(i);
      } 
      } else {
        ship.ship.position.push(i + 1);
      }
    }

  

    function receiveAttack(coordinate) {
      if(coordinates[coordinate] === null) {
        coordinates[coordinate] = 'Hit';
      } else {
        ship1.ship.hitCounter.push("Hit");
      }
    }

    function shipSunk() {
      if (ship1.ship.isSunk() === true ) {
        console.log("Computer Win");
      } else {
        console.log("You Win!");
      }
    }
    shipSunk();

    return {coordinates, placeShip};

  }

module.exports = gameBoard;
