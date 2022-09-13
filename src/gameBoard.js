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
  const smallShip = generateShip(3);
  const smallerShip = generateShip(2);

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

let playersGrid = document.querySelectorAll('.grid-player > div');
let placementGrid = document.querySelectorAll('.placement-grid > div');
const randomNumber = [];

function player() {
  playersGrid = document.querySelectorAll('.grid-player > div');
  let computer = Math.floor(Math.random() * 100); // const computer = Math.floor(Math.random() * 100); // Generate random number to attack the random coordinates
  while (randomNumber.includes(computer)) {
    computer = Math.floor(Math.random() * 100);
  }
  randomNumber.push(computer);
  console.log(randomNumber);
  console.log(this.getAttribute('id'));
  this.style.backgroundColor = 'blue';

  for (let n = 0; n < occupiedCoordinates.length; n++) {
    if (JSON.stringify(occupiedCoordinates[n]) === this.getAttribute('id')) {
      this.style.backgroundColor = 'red';
    }
  }

  for (let k = 0; k < playersGrid.length; k++) {
    if (
      playersGrid[k].getAttribute('data-id') ===
      String(randomNumber[randomNumber.length - 1])
    ) {
      playersGrid[k].style.backgroundColor = 'black';
      for (let m = 0; m < occupiedCoordinates.length; m++) {
        if (
          JSON.stringify(occupiedCoordinates[m]) ===
          playersGrid[k].getAttribute('id')
        ) {
          playersGrid[k].style.backgroundColor = 'red';
        }
      }
    }
  }
}

function gameLoop() {
  let counter = 0;
  let axisCounter = 0;
  const gridPlayerBoard = document.querySelector('.grid-player');
  const gridComputerBoard = document.querySelector('.grid-computer');
  const gridPlacement = document.querySelector('.placement-grid');
  const addButton = document.querySelector('.rotate');
  const newGameBoard = gameBoard();

  // Click button to change axis from x to y
  addButton.addEventListener('click', () => {
    axisCounter++;
  });

  function placeBoard() {
    placementGrid = document.querySelectorAll('.placement-grid > div');
    const getId = Number(this.getAttribute('data-id'));
    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 5; i++) {
          if (getId % 5 > 0 && getId % 10 > 5) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 4; i++) {
          if (getId % 5 > 0 && getId % 10 > 6) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 3; i++) {
          if (getId % 5 > 0 && getId % 10 > 7) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 3; i++) {
          if (getId % 5 > 0 && getId % 10 > 7) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 2; i++) {
          if (getId % 5 > 0 && getId % 10 > 8) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      }
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 50; i++) {
          if (getId > 59) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
          i += 9;
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 40; i++) {
          if (getId > 69) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
          i += 9;
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 30; i++) {
          if (getId > 79) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
          i += 9;
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 30; i++) {
          if (getId > 79) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
          i += 9;
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 20; i++) {
          if (getId > 89) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
          i += 9;
        }
      }
    }
  }

  function removeBoard() {
    const getId = Number(this.getAttribute('data-id'));
    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 5; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 4; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 3; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 3; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 2; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      }
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 50; i++) {
          if (placementGrid[i].style.backgroundColor !== 'black') {
            placementGrid[i].style.backgroundColor = '';
            i += 9;
          }
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 40; i++) {
          placementGrid[i].style.backgroundColor = '';
          i += 9;
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 30; i++) {
          placementGrid[i].style.backgroundColor = '';
          i += 9;
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 30; i++) {
          placementGrid[i].style.backgroundColor = '';
          i += 9;
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 20; i++) {
          placementGrid[i].style.backgroundColor = '';
          i += 9;
        }
      }
    }
  }

  function addBoard() {
    const getId = Number(this.getAttribute('data-id'));
    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 5; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 4; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 3; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 3; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 2; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      }
      counter++;
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (let i = getId; i < getId + 50; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
          i += 9;
        }
      } else if (counter === 1) {
        for (let i = getId; i < getId + 40; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
          i += 9;
        }
      } else if (counter === 2) {
        for (let i = getId; i < getId + 30; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
          i += 9;
        }
      } else if (counter === 3) {
        for (let i = getId; i < getId + 30; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
          i += 9;
        }
      } else if (counter === 4) {
        for (let i = getId; i < getId + 20; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
          i += 9;
        }
      }
    }
  }
  for (let p = 0; p < newGameBoard.newCoordinates.length; p++) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-id', p);
    newDiv.setAttribute('id', JSON.stringify(newGameBoard.newCoordinates[p]));
    newDiv.style.width = '10%';
    newDiv.style.height = '10%';
    newDiv.style.border = '1px solid black';
    newDiv.addEventListener('mouseover', placeBoard);
    newDiv.addEventListener('mouseout', removeBoard);
    newDiv.addEventListener('click', addBoard);
    gridPlacement.appendChild(newDiv);
  }

  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-id', i);
    newDiv.setAttribute('id', JSON.stringify(newGameBoard.newCoordinates[i]));
    newDiv.style.width = '10%';
    newDiv.style.height = '10%';
    newDiv.style.border = '1px solid black';
    gridPlayerBoard.appendChild(newDiv);
  }

  for (let j = 0; j < newGameBoard.newCoordinates.length; j++) {
    const newCoord = document.createElement('div');
    newCoord.setAttribute('data-id', j);
    newCoord.setAttribute('id', JSON.stringify(newGameBoard.newCoordinates[j]));
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
