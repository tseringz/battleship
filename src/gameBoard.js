const _ = require('lodash');

/* eslint-disable no-plusplus */
function generateShip(shipLength) {
  const ship = {
    length: shipLength,
    counter: [],
    position: [],
    hit: function (attackCoordinates) {
      if (this.counter.length < shipLength) {
        this.counter.push(attackCoordinates);
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
  const alphabet = 'A';
  const newCoordinates = [];
  const missedCoordinates = [];
  const occupiedCoordinates = [];
  let counter = 3;
  const biggestShip = generateShip(5);
  const biggerShip = generateShip(4);
  const bigShip = generateShip(3);
  const smallShip = generateShip(2);
  const smallerShip = generateShip(1);
  const shipCoordinates = ['B', 9];

  // Generate game board by giving coordinates to each position because of to track coordinates
  for (let i = 1; i <= 10; i++) {
    const letters = String.fromCharCode(alphabet.charCodeAt(0) + (i - 1));
    for (let j = 1; j <= 10; j++) {
      newCoordinates.push([letters, j]);
    }
  }

  // Placing ships at specific coordinates
  for (let i = 0; i < newCoordinates.length; i++) {
    if (JSON.stringify(shipCoordinates) === JSON.stringify(newCoordinates[i])) {
      counter++;
      if (counter === 1) {
        for (let j = 0; j < biggestShip.ship.length; j++) {
          // Place first ship at specific coordinates
          biggestShip.ship.position.push(newCoordinates[i]);
          occupiedCoordinates.push(newCoordinates[i]);
          i++;
        }
      } else if (counter === 2) {
        // Place second ship at specific coordinates
        for (let j = 0; j < biggerShip.ship.length; j++) {
          biggerShip.ship.position.push(newCoordinates[i]);
          occupiedCoordinates.push(newCoordinates[i]);
          i++;
        }
      } else if (counter === 3) {
        // Place third ship at specific coordinates
        for (let j = 0; j < bigShip.ship.length; j++) {
          bigShip.ship.position.push(newCoordinates[i]);
          occupiedCoordinates.push(newCoordinates[i]);
          i++;
        }
      } else if (counter === 4) {
        // Place third ship at specific coordinates
        for (let j = 0; j < smallShip.ship.length; j++) {
          smallShip.ship.position.push(newCoordinates[i]);
          occupiedCoordinates.push(newCoordinates[i]);
          i++;
        }
      } else if (counter === 5) {
        // Place third ship at specific coordinates
        for (let j = 0; j < smallerShip.ship.length; j++) {
          smallerShip.ship.position.push(newCoordinates[i]);
          occupiedCoordinates.push(newCoordinates[i]);
          i++;
        }
      }
    }
  }

  function receiveAttack(attackCoordinates) {
    // Check if first ship hit
    for (let k = 0; k < biggestShip.ship.length; k++) {
      if (
        JSON.stringify(biggestShip.ship.position[k]) ===
        JSON.stringify(attackCoordinates)
      ) {
        biggestShip.ship.hit(attackCoordinates);
      }
    }
    // Check if second Ship hit
    for (let k = 0; k < biggerShip.ship.length; k++) {
      if (
        JSON.stringify(biggerShip.ship.position[k]) ===
        JSON.stringify(attackCoordinates)
      ) {
        biggerShip.ship.hit(attackCoordinates);
      }
    }
    // Check if third Ship hit
    for (let k = 0; k < bigShip.ship.length; k++) {
      if (
        JSON.stringify(bigShip.ship.position[k]) ===
        JSON.stringify(attackCoordinates)
      ) {
        bigShip.ship.hit(attackCoordinates);
      }
    }
    // Check if forth Ship hit
    for (let k = 0; k < smallShip.ship.length; k++) {
      if (
        JSON.stringify(smallShip.ship.position[k]) ===
        JSON.stringify(attackCoordinates)
      ) {
        smallShip.ship.hit(attackCoordinates);
      }
    }
    // Check if fifth Ship hit
    for (let k = 0; k < smallerShip.ship.length; k++) {
      if (
        JSON.stringify(smallerShip.ship.position[k]) ===
        JSON.stringify(attackCoordinates)
      ) {
        smallerShip.ship.hit(attackCoordinates);
      }
    }

    const convertString = occupiedCoordinates.map(JSON.stringify);
    function isCoordinates(newCoord) {
      return newCoord === JSON.stringify(attackCoordinates);
    }
    const isCoord = convertString.find(isCoordinates);
    console.log(isCoord);
    if (isCoord === undefined) {
      missedCoordinates.push(attackCoordinates);
    }
  }
  receiveAttack(['C', 9]);

  // check if all the ship have been sunk
  if (
    biggestShip.ship.isSunk === true &&
    biggerShip.ship.isSunk === true &&
    bigShip.ship.isSunk === true &&
    smallShip.ship.isSunk === true &&
    smallerShip.ship.isSunk === true
  ) {
    console.log('Game Over!!');
  }

  console.log(smallShip.ship.position);
  console.log(missedCoordinates);
  console.log(occupiedCoordinates);
  console.log(smallShip.ship.counter);
  return { newCoordinates, biggestShip };
}
gameBoard();

function player() {
  let counter = 0;
  let playerOne;
  let computer;
  const playerGameBoard = gameBoard();
  const computerGameBoard = gameBoard();

  if (counter % 2 === 0) {
    playerOne = playerGameBoard.receiveAttack(['C', 9]);
    counter++;
  } else {
    computer = computerGameBoard.receiveAttack(['C', 9]);
    counter++;
  }
}
player();
// { name: 'cherries', quantity: 5 }

module.exports = gameBoard;
