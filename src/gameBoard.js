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
const missedCoordinates = [];
const occupiedCoordinates = [];

function gameBoard() {
  const alphabet = 'A';
  const newCoordinates = [];
  const biggestShip = generateShip(5);
  const biggerShip = generateShip(4);
  const bigShip = generateShip(3);
  const smallShip = generateShip(2);
  const smallerShip = generateShip(1);

  // Generate game board by giving coordinates to each position because of to track coordinates
  for (let i = 1; i <= 10; i++) {
    const letters = String.fromCharCode(alphabet.charCodeAt(0) + (i - 1));
    for (let j = 1; j <= 10; j++) {
      newCoordinates.push([letters, j]);
    }
  }

  const shipCoordinates = newCoordinates[Math.floor(Math.random() * 100)];

  // Placing ships at specific coordinates
  for (let i = 0; i < newCoordinates.length; i++) {
    if (JSON.stringify(shipCoordinates) === JSON.stringify(newCoordinates[i])) {
      for (let j = 0; j < biggestShip.ship.length; j++) {
        // Place first ship at specific coordinates
        biggestShip.ship.position.push(newCoordinates[i]);
        occupiedCoordinates.push(newCoordinates[i]);
        i++;
      }
    }
  }
  console.log(occupiedCoordinates);
  console.log(shipCoordinates);
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
  return { newCoordinates, biggestShip, receiveAttack };
}

let allGrid = document.querySelectorAll('.grid-player > div');
const randomNumber = [];

function player() {
  allGrid = document.querySelectorAll('.grid-player > div');
  let computer = Math.floor(Math.random() * 100);
  let attackColor; // const computer = Math.floor(Math.random() * 100); // Generate random number to attack the random coordinates
  while (randomNumber.includes(computer)) {
    computer = Math.floor(Math.random() * 100);
  }
  randomNumber.push(computer);
  console.log(randomNumber);
  console.log(this.getAttribute('id'));
  this.style.backgroundColor = 'blue';
  for (let k = 0; k < allGrid.length; k++) {
    if (
      allGrid[k].getAttribute('data-id') ===
      String(randomNumber[randomNumber.length - 1])
    ) {
      allGrid[k].style.backgroundColor = 'black';
      for (let m = 0; m < occupiedCoordinates.length; m++) {
        if (
          JSON.stringify(occupiedCoordinates[m]) ===
          allGrid[k].getAttribute('id')
        ) {
          allGrid[k].style.backgroundColor = 'red';
        }
      }
    }
  }
}

function gameLoop() {
  const gridPlayerBoard = document.querySelector('.grid-player');
  const gridComputerBoard = document.querySelector('.grid-computer');
  const playerGameBoard = gameBoard();
  const computerGameBoard = gameBoard();

  for (let i = 0; i < playerGameBoard.newCoordinates.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-id', i);
    newDiv.setAttribute(
      'id',
      JSON.stringify(playerGameBoard.newCoordinates[i])
    );
    newDiv.style.width = '10%';
    newDiv.style.height = '10%';
    newDiv.style.border = '1px solid black';
    gridPlayerBoard.appendChild(newDiv);
  }

  for (let j = 0; j < computerGameBoard.newCoordinates.length; j++) {
    const newCoord = document.createElement('div');
    newCoord.setAttribute('data-id', j);
    newCoord.setAttribute(
      'id',
      JSON.stringify(computerGameBoard.newCoordinates[j])
    );
    newCoord.style.width = '10%';
    newCoord.style.height = '10%';
    newCoord.style.border = '1px solid black';
    newCoord.addEventListener('click', player);
    gridComputerBoard.appendChild(newCoord);
  }
}
gameLoop();

export default gameLoop;
module.exports = gameBoard;
