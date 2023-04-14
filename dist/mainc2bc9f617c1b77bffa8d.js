/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var generateShip = __webpack_require__(/*! ./ship */ "./src/ship.js");

var missedCoordinates = [];
var occupiedCoordinates = [];

function gameBoard() {
  var alphabet = 'A';
  var newCoordinates = [];
  var biggestShip = generateShip(5);
  var biggerShip = generateShip(4);
  var bigShip = generateShip(3);
  var smallShip = generateShip(3);
  var smallerShip = generateShip(2); // Generate game board by giving coordinates to each position because of to track coordinates

  for (var i = 1; i <= 10; i++) {
    var letters = String.fromCharCode(alphabet.charCodeAt(0) + (i - 1));

    for (var j = 1; j <= 10; j++) {
      newCoordinates.push([letters, j]);
    }
  }

  var shipCoordinates = newCoordinates[Math.floor(Math.random() * 100)]; // Placing ships at specific coordinates

  for (var _i = 0; _i < newCoordinates.length; _i++) {
    if (JSON.stringify(shipCoordinates) === JSON.stringify(newCoordinates[_i])) {
      for (var _j = 0; _j < biggestShip.ship.length; _j++) {
        // Place first ship at specific coordinates
        biggestShip.ship.position.push(newCoordinates[_i]);
        occupiedCoordinates.push(newCoordinates[_i]);
        _i++;
      }
    }
  }

  console.log(occupiedCoordinates);
  console.log(shipCoordinates);

  function receiveAttack(attackCoordinates) {
    // Check if first ship hit
    for (var k = 0; k < biggestShip.ship.length; k++) {
      if (JSON.stringify(biggestShip.ship.position[k]) === JSON.stringify(attackCoordinates)) {
        biggestShip.ship.hit(attackCoordinates);
      }
    } // Check if second Ship hit


    for (var _k = 0; _k < biggerShip.ship.length; _k++) {
      if (JSON.stringify(biggerShip.ship.position[_k]) === JSON.stringify(attackCoordinates)) {
        biggerShip.ship.hit(attackCoordinates);
      }
    } // Check if third Ship hit


    for (var _k2 = 0; _k2 < bigShip.ship.length; _k2++) {
      if (JSON.stringify(bigShip.ship.position[_k2]) === JSON.stringify(attackCoordinates)) {
        bigShip.ship.hit(attackCoordinates);
      }
    } // Check if forth Ship hit


    for (var _k3 = 0; _k3 < smallShip.ship.length; _k3++) {
      if (JSON.stringify(smallShip.ship.position[_k3]) === JSON.stringify(attackCoordinates)) {
        smallShip.ship.hit(attackCoordinates);
      }
    } // Check if fifth Ship hit


    for (var _k4 = 0; _k4 < smallerShip.ship.length; _k4++) {
      if (JSON.stringify(smallerShip.ship.position[_k4]) === JSON.stringify(attackCoordinates)) {
        smallerShip.ship.hit(attackCoordinates);
      }
    }

    var convertString = occupiedCoordinates.map(JSON.stringify);

    function isCoordinates(newCoord) {
      return newCoord === JSON.stringify(attackCoordinates);
    }

    var isCoord = convertString.find(isCoordinates);
    console.log(isCoord);

    if (isCoord === undefined) {
      missedCoordinates.push(attackCoordinates);
    }
  }

  receiveAttack(['C', 9]); // check if all the ship have been sunk

  if (biggestShip.ship.isSunk === true && biggerShip.ship.isSunk === true && bigShip.ship.isSunk === true && smallShip.ship.isSunk === true && smallerShip.ship.isSunk === true) {
    console.log('Game Over!!');
  } else {
    console.log('Hi! this is not going good!');
  }

  return {
    newCoordinates: newCoordinates,
    biggestShip: biggestShip,
    receiveAttack: receiveAttack
  };
}

var playersGrid = document.querySelectorAll('.grid-player > div');
var placementGrid = document.querySelectorAll('.placement-grid > div');
var randomNumber = [];

function player() {
  playersGrid = document.querySelectorAll('.grid-player > div');
  var computer = Math.floor(Math.random() * 100); // const computer = Math.floor(Math.random() * 100); // Generate random number to attack the random coordinates

  while (randomNumber.includes(computer)) {
    computer = Math.floor(Math.random() * 100);
  }

  randomNumber.push(computer);
  console.log(randomNumber);
  console.log(this.getAttribute('id'));
  this.style.backgroundColor = 'blue';

  for (var n = 0; n < occupiedCoordinates.length; n++) {
    if (JSON.stringify(occupiedCoordinates[n]) === this.getAttribute('id')) {
      this.style.backgroundColor = 'red';
    }
  }

  for (var k = 0; k < playersGrid.length; k++) {
    if (playersGrid[k].getAttribute('data-id') === String(randomNumber[randomNumber.length - 1])) {
      playersGrid[k].style.backgroundColor = 'black';

      for (var m = 0; m < occupiedCoordinates.length; m++) {
        if (JSON.stringify(occupiedCoordinates[m]) === playersGrid[k].getAttribute('id')) {
          playersGrid[k].style.backgroundColor = 'red';
        }
      }
    }
  }
}

function gameLoop() {
  var counter = 0;
  var axisCounter = 0;
  var verticalCounter = 0;
  var shipAxis = [];
  var gridPlayerBoard = document.querySelector('.grid-player');
  var gridComputerBoard = document.querySelector('.grid-computer');
  var gridPlacement = document.querySelector('.placement-grid');
  var addButton = document.querySelector('.rotate');
  var newGameBoard = gameBoard(); // Click button to change axis from x to y

  document.addEventListener('DomContentLoaded', function (e) {
    addButton.addEventListener('click', function () {
      axisCounter++;
    });
  });

  function placeBoard() {
    placementGrid = document.querySelectorAll('.placement-grid > div');
    var getId = Number(this.getAttribute('data-id'));

    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (var i = getId; i < getId + 5; i++) {
          if (getId % 5 > 0 && getId % 10 > 5) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[i].style.backgroundColor = 'blue';
          }
        }
      } else if (counter === 1) {
        for (var _i2 = getId; _i2 < getId + 4; _i2++) {
          if (verticalCounter === 1) {
            if (getId % 5 > 0 && getId % 10 > 6 || getId > shipAxis[0] - 4 && getId < shipAxis[0] || getId > shipAxis[0] + 10 - 4 && getId < shipAxis[0] + 10 || getId > shipAxis[0] + 20 - 4 && getId < shipAxis[0] + 20 || getId > shipAxis[0] + 30 - 4 && getId < shipAxis[0] + 30 || getId > shipAxis[0] + 40 - 4 && getId < shipAxis[0] + 40) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i2].style.backgroundColor = 'blue';
            }
          } else if (verticalCounter === 0) {
            if (getId % 5 > 0 && getId % 10 > 6 || getId > shipAxis[0] - 4 && getId < shipAxis[0]) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i2].style.backgroundColor = 'blue';
            }
          }
        }
      } else if (counter === 2) {
        for (var _i3 = getId; _i3 < getId + 3; _i3++) {
          if (verticalCounter === 0) {
            if (getId % 5 > 0 && getId % 10 > 7 || getId > shipAxis[1] - 3 && getId < shipAxis[1] || getId > shipAxis[0] - 3 && getId < shipAxis[0]) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i3].style.backgroundColor = 'blue';
            }
          } else if (verticalCounter === 1) {
            if (getId % 5 > 0 && getId % 10 > 7 || getId > shipAxis[1] - 3 && getId < shipAxis[1] || getId > shipAxis[0] - 3 && getId < shipAxis[0] || getId > shipAxis[1] + 10 - 3 && getId < shipAxis[1] + 10 || getId > shipAxis[1] + 20 - 3 && getId < shipAxis[1] + 20 || getId > shipAxis[1] + 30 - 3 && getId < shipAxis[1] + 30) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i3].style.backgroundColor = 'blue';
            }
          } else if (verticalCounter === 2) {
            if (getId % 5 > 0 && getId % 10 > 7 || getId > shipAxis[1] - 3 && getId < shipAxis[1] || getId > shipAxis[0] - 3 && getId < shipAxis[0] || getId > shipAxis[1] + 10 - 3 && getId < shipAxis[1] + 10 || getId > shipAxis[1] + 20 - 3 && getId < shipAxis[1] + 20 || getId > shipAxis[1] + 30 - 3 && getId < shipAxis[1] + 30) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i3].style.backgroundColor = 'blue';
            }
          }
        }
      } else if (counter === 3) {
        for (var _i4 = getId; _i4 < getId + 3; _i4++) {
          if (verticalCounter % 2 === 0) {
            if (getId % 5 > 0 && getId % 10 > 7 || getId > shipAxis[2] - 3 && getId < shipAxis[2] || getId > shipAxis[1] - 3 && getId < shipAxis[1] || getId > shipAxis[0] - 3 && getId < shipAxis[0]) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i4].style.backgroundColor = 'blue';
            }
          } else if (verticalCounter % 2 !== 0) {
            if (getId % 5 > 0 && getId % 10 > 7 || getId > shipAxis[2] - 3 && getId < shipAxis[2] || getId > shipAxis[1] - 3 && getId < shipAxis[1] || getId > shipAxis[0] - 3 && getId < shipAxis[0] || getId > shipAxis[1] + 10 - 3 && getId < shipAxis[1] + 10 || getId > shipAxis[1] + 20 - 3 && getId < shipAxis[1] + 20 || getId > shipAxis[1] + 30 - 3 && getId < shipAxis[1] + 30) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i4].style.backgroundColor = 'blue';
            }
          }
        }
      } else if (counter === 4) {
        for (var _i5 = getId; _i5 < getId + 2; _i5++) {
          if (verticalCounter % 2 === 0) {
            if (getId % 5 > 0 && getId % 10 > 8 || getId > shipAxis[2] - 2 && getId < shipAxis[2] || getId > shipAxis[1] - 2 && getId < shipAxis[1] || getId > shipAxis[0] - 2 && getId < shipAxis[0] || getId > shipAxis[3] - 2 && getId < shipAxis[3]) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i5].style.backgroundColor = 'blue';
            }
          } else if (verticalCounter % 2 !== 0) {
            if (getId % 5 > 0 && getId % 10 > 8 || getId > shipAxis[2] - 2 && getId < shipAxis[2] || getId > shipAxis[1] - 2 && getId < shipAxis[1] || getId > shipAxis[0] - 2 && getId < shipAxis[0] || getId > shipAxis[3] - 2 && getId < shipAxis[3] || getId > shipAxis[1] + 10 - 2 && getId < shipAxis[1] + 10 || getId > shipAxis[1] + 20 - 2 && getId < shipAxis[1] + 20 || getId > shipAxis[1] + 30 - 2 && getId < shipAxis[1] + 30) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i5].style.backgroundColor = 'blue';
            }
          }
        }
      }
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (var _i6 = getId; _i6 < getId + 50; _i6++) {
          if (getId > 59) {
            this.style.backgroundColor = 'red';
            this.style.cursor = 'not-allowed';
          } else {
            placementGrid[_i6].style.backgroundColor = 'blue';
          }

          _i6 += 9;
        }
      } else if (counter === 1) {
        for (var _i7 = getId; _i7 < getId + 40; _i7++) {
          if (verticalCounter % 2 === 0) {
            if (getId > 69 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[0] - 15 && getId > shipAxis[0] - 21 || getId < shipAxis[0] - 25 && getId > shipAxis[0] - 31) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i7].style.backgroundColor = 'blue';
            }

            _i7 += 9;
          } else if (verticalCounter % 2 !== 0) {
            if (getId > 69 || getId === shipAxis[0] - 10 || getId === shipAxis[0] - 20 || getId === shipAxis[0] - 30) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'pointer';
            } else {
              placementGrid[_i7].style.backgroundColor = 'blue';
            }

            _i7 += 9;
          }
        }
      } else if (counter === 2) {
        for (var _i8 = getId; _i8 < getId + 30; _i8++) {
          if (verticalCounter % 2 === 0) {
            if (getId > 79 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[0] - 15 && getId > shipAxis[0] - 21 || getId < shipAxis[1] - 4 && getId > shipAxis[1] - 11 || getId < shipAxis[1] - 14 && getId > shipAxis[1] - 21) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i8].style.backgroundColor = 'blue';
            }

            _i8 += 9;
          } else if (verticalCounter % 2 !== 0) {
            if (getId > 79 || getId === shipAxis[0] - 10 || getId === shipAxis[0] - 20 || getId === shipAxis[1] - 10 || getId === shipAxis[1] - 20 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[0] - 15 && getId > shipAxis[0] - 21) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'pointer';
            } else {
              placementGrid[_i8].style.backgroundColor = 'blue';
            }

            _i8 += 9;
          }
        }
      } else if (counter === 3) {
        for (var _i9 = getId; _i9 < getId + 30; _i9++) {
          if (verticalCounter % 2 === 0) {
            if (getId > 79 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId === shipAxis[2] - 10 || getId === shipAxis[2] - 20 || getId === shipAxis[1] - 10 || getId === shipAxis[1] - 20) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i9].style.backgroundColor = 'blue';
            }

            _i9 += 9;
          } else if (verticalCounter % 2 !== 0) {
            if (getId > 79 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[0] - 15 && getId > shipAxis[0] - 21 || getId === shipAxis[1] - 10 || getId === shipAxis[1] - 20 || getId < shipAxis[2] - 7 && getId > shipAxis[2] - 11 || getId < shipAxis[2] - 17 && getId > shipAxis[2] - 21) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i9].style.backgroundColor = 'blue';
            }

            _i9 += 9;
          }
        }
      } else if (counter === 4) {
        for (var _i10 = getId; _i10 < getId + 20; _i10++) {
          if (verticalCounter % 2 === 0) {
            if (getId > 89 || getId === shipAxis[3] - 10 || getId === shipAxis[2] - 10 || getId === shipAxis[1] - 10 || getId === shipAxis[0] - 10 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[2] - 7 && getId > shipAxis[2] - 10 || getId < shipAxis[1] - 6 && getId > shipAxis[1] - 10 || getId < shipAxis[3] - 7 && getId > shipAxis[3] - 10) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i10].style.backgroundColor = 'blue';
            }

            _i10 += 9;
          } else if (verticalCounter % 2 !== 0) {
            if (getId > 89 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId === shipAxis[1] - 10 || getId < shipAxis[2] - 7 && getId > shipAxis[2] - 11 || getId < shipAxis[0] - 5 && getId > shipAxis[0] - 11 || getId < shipAxis[0] - 15 && getId > shipAxis[0] - 21 || getId < shipAxis[3] - 17 && getId > shipAxis[3] - 21) {
              this.style.backgroundColor = 'red';
              this.style.cursor = 'not-allowed';
            } else {
              placementGrid[_i10].style.backgroundColor = 'blue';
            }

            _i10 += 9;
          }
        }
      }
    }
  }

  function removeBoard() {
    var getId = Number(this.getAttribute('data-id'));

    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (var i = getId; i < getId + 5; i++) {
          placementGrid[i].style.backgroundColor = '';
        }
      } else if (counter === 1) {
        for (var _i11 = getId; _i11 < getId + 4; _i11++) {
          if (placementGrid[_i11].style.backgroundColor !== 'black') {
            placementGrid[_i11].style.backgroundColor = '';
          }
        }
      } else if (counter === 2) {
        for (var _i12 = getId; _i12 < getId + 3; _i12++) {
          if (placementGrid[_i12].style.backgroundColor !== 'black') {
            placementGrid[_i12].style.backgroundColor = '';
          }
        }
      } else if (counter === 3) {
        for (var _i13 = getId; _i13 < getId + 3; _i13++) {
          if (placementGrid[_i13].style.backgroundColor !== 'black') {
            placementGrid[_i13].style.backgroundColor = '';
          }
        }
      } else if (counter === 4) {
        for (var _i14 = getId; _i14 < getId + 2; _i14++) {
          if (placementGrid[_i14].style.backgroundColor !== 'black') {
            placementGrid[_i14].style.backgroundColor = '';
          }
        }
      }
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (var _i15 = getId; _i15 < getId + 50; _i15++) {
          if (placementGrid[_i15].style.backgroundColor !== 'black') {
            placementGrid[_i15].style.backgroundColor = '';
            _i15 += 9;
          }
        }
      } else if (counter === 1) {
        for (var _i16 = getId; _i16 < getId + 40; _i16++) {
          if (placementGrid[_i16].style.backgroundColor !== 'black') {
            placementGrid[_i16].style.backgroundColor = '';
            _i16 += 9;
          }
        }
      } else if (counter === 2) {
        for (var _i17 = getId; _i17 < getId + 30; _i17++) {
          if (placementGrid[_i17].style.backgroundColor !== 'black') {
            placementGrid[_i17].style.backgroundColor = '';
            _i17 += 9;
          }
        }
      } else if (counter === 3) {
        for (var _i18 = getId; _i18 < getId + 30; _i18++) {
          if (placementGrid[_i18].style.backgroundColor !== 'black') {
            placementGrid[_i18].style.backgroundColor = '';
            _i18 += 9;
          }
        }
      } else if (counter === 4) {
        for (var _i19 = getId; _i19 < getId + 20; _i19++) {
          if (placementGrid[_i19].style.backgroundColor !== 'black') {
            placementGrid[_i19].style.backgroundColor = '';
            _i19 += 9;
          }
        }
      }
    }
  }

  function addBoard() {
    var getId = Number(this.getAttribute('data-id'));
    shipAxis.push(getId);
    console.log(shipAxis);

    if (axisCounter % 2 === 0) {
      if (counter === 0) {
        for (var i = getId; i < getId + 5; i++) {
          placementGrid[i].style.backgroundColor = 'black';
          placementGrid[i].removeEventListener('mouseover', placeBoard);
          placementGrid[i].removeEventListener('mouseout', removeBoard);
          placementGrid[i].style.pointerEvents = 'none';
          placementGrid[i].style.cursor = 'not-allowed';
        }
      } else if (counter === 1) {
        for (var _i20 = getId; _i20 < getId + 4; _i20++) {
          placementGrid[_i20].style.backgroundColor = 'black';

          placementGrid[_i20].removeEventListener('mouseover', placeBoard);

          placementGrid[_i20].removeEventListener('mouseout', removeBoard);

          placementGrid[_i20].style.pointerEvents = 'none';
          placementGrid[_i20].style.cursor = 'not-allowed';
        }
      } else if (counter === 2) {
        for (var _i21 = getId; _i21 < getId + 3; _i21++) {
          placementGrid[_i21].style.backgroundColor = 'black';

          placementGrid[_i21].removeEventListener('mouseover', placeBoard);

          placementGrid[_i21].removeEventListener('mouseout', removeBoard);

          placementGrid[_i21].style.pointerEvents = 'none';
          placementGrid[_i21].style.cursor = 'not-allowed';
        }
      } else if (counter === 3) {
        for (var _i22 = getId; _i22 < getId + 3; _i22++) {
          placementGrid[_i22].style.backgroundColor = 'black';

          placementGrid[_i22].removeEventListener('mouseover', placeBoard);

          placementGrid[_i22].removeEventListener('mouseout', removeBoard);

          placementGrid[_i22].style.pointerEvents = 'none';
          placementGrid[_i22].style.cursor = 'not-allowed';
        }
      } else if (counter === 4) {
        for (var _i23 = getId; _i23 < getId + 2; _i23++) {
          placementGrid[_i23].style.backgroundColor = 'black';

          placementGrid[_i23].removeEventListener('mouseover', placeBoard);

          placementGrid[_i23].removeEventListener('mouseout', removeBoard);

          placementGrid[_i23].style.pointerEvents = 'none';
          placementGrid[_i23].style.cursor = 'not-allowed';
        }
      }

      counter++;
    } else if (axisCounter % 2 !== 0) {
      if (counter === 0) {
        for (var _i24 = getId; _i24 < getId + 50; _i24++) {
          placementGrid[_i24].style.backgroundColor = 'black';

          placementGrid[_i24].removeEventListener('mouseover', placeBoard);

          placementGrid[_i24].removeEventListener('mouseout', removeBoard);

          placementGrid[_i24].style.pointerEvents = 'none';
          placementGrid[_i24].style.cursor = 'not-allowed';
          _i24 += 9;
        }

        verticalCounter++;
      } else if (counter === 1) {
        for (var _i25 = getId; _i25 < getId + 40; _i25++) {
          placementGrid[_i25].style.backgroundColor = 'black';

          placementGrid[_i25].removeEventListener('mouseover', placeBoard);

          placementGrid[_i25].removeEventListener('mouseout', removeBoard);

          placementGrid[_i25].style.pointerEvents = 'none';
          placementGrid[_i25].style.cursor = 'not-allowed';
          _i25 += 9;
        }

        verticalCounter++;
      } else if (counter === 2) {
        for (var _i26 = getId; _i26 < getId + 30; _i26++) {
          placementGrid[_i26].style.backgroundColor = 'black';

          placementGrid[_i26].removeEventListener('mouseover', placeBoard);

          placementGrid[_i26].removeEventListener('mouseout', removeBoard);

          placementGrid[_i26].style.pointerEvents = 'none';
          placementGrid[_i26].style.cursor = 'not-allowed';
          _i26 += 9;
        }

        verticalCounter++;
      } else if (counter === 3) {
        for (var _i27 = getId; _i27 < getId + 30; _i27++) {
          placementGrid[_i27].style.backgroundColor = 'black';

          placementGrid[_i27].removeEventListener('mouseover', placeBoard);

          placementGrid[_i27].removeEventListener('mouseout', removeBoard);

          placementGrid[_i27].style.pointerEvents = 'none';
          placementGrid[_i27].style.cursor = 'not-allowed';
          _i27 += 9;
        }

        verticalCounter++;
      } else if (counter === 4) {
        for (var _i28 = getId; _i28 < getId + 20; _i28++) {
          placementGrid[_i28].style.backgroundColor = 'black';

          placementGrid[_i28].removeEventListener('mouseover', placeBoard);

          placementGrid[_i28].removeEventListener('mouseout', removeBoard);

          placementGrid[_i28].style.pointerEvents = 'none';
          placementGrid[_i28].style.cursor = 'not-allowed';
          _i28 += 9;
        }

        verticalCounter++;
      }

      counter++;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    //your script here.
    for (var p = 0; p < newGameBoard.newCoordinates.length; p++) {
      var newDiv = document.createElement('div');
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

    for (var i = 0; i < newGameBoard.newCoordinates.length; i++) {
      var _newDiv = document.createElement('div');

      _newDiv.setAttribute('data-id', i);

      _newDiv.setAttribute('id', JSON.stringify(newGameBoard.newCoordinates[i]));

      _newDiv.style.width = '10%';
      _newDiv.style.height = '10%';
      _newDiv.style.border = '1px solid black';
      gridPlayerBoard.appendChild(_newDiv);
    }

    for (var j = 0; j < newGameBoard.newCoordinates.length; j++) {
      var newCoord = document.createElement('div');
      newCoord.setAttribute('data-id', j);
      newCoord.setAttribute('id', JSON.stringify(newGameBoard.newCoordinates[j]));
      newCoord.style.width = '10%';
      newCoord.style.height = '10%';
      newCoord.style.border = '1px solid black';
      newCoord.addEventListener('click', player);
      gridComputerBoard.appendChild(newCoord);
    }
  });
}

gameLoop();
module.exports = gameBoard;

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

function generateShip(shipLength) {
  var ship = {
    length: shipLength,
    counter: [],
    position: [],
    hit: function hit(hitCoordinate) {
      if (this.counter.length < shipLength) {
        this.counter.push(hitCoordinate);
      }

      return this.counter.length;
    },
    isSunk: function isSunk() {
      if (this.counter.length === shipLength) {
        return true;
      }

      return false;
    }
  };
  return {
    ship: ship
  };
}

module.exports = generateShip;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: #2fa8cc;\n  font-family: \"Roboto\", sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  padding: 20px;\n}\n\n.container {\n  background-color: #f4f4f4;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 10px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 50px 20px;\n  text-align: center;\n  max-width: 100%;\n  width: 1040px;\n}\n\n.grid-player, .grid-computer, .placement-grid {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\nh3 {\n  margin: 0;\n  opacity: 0.5;\n  letter-spacing: 2px;\n}\n\nimg {\n  width: 100px;\n  margin-bottom: 20px;\n}\n\n.grid-player, .grid-computer, .placement-grid {\n  width: 400px;\n  height: 400px;\n}\n\n.btn {\n  background-color: #2fa8cc;\n  color: #f4f4f4;\n  border: 0;\n  border-radius: 10px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 14px 40px;\n  font-size: 16px;\n  cursor: pointer;\n}\n.btn:active {\n  transform: scale(0.98);\n}\n.btn:focus {\n  outline: 0;\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n}\n.modal-wrapper .modal {\n  background-color: #f4f4f4;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}", "",{"version":3,"sources":["webpack://./src/style/main.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;AAJF;;AAOA;EACE,yBATc;EAUd,iCAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,aAAA;EACA,gBAAA;EACA,SAAA;EACA,aAAA;AAJF;;AAOA;EACE,yBArBgB;EAsBhB,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,mBAAA;EACA,wEAzBW;EA0BX,kBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;AAJF;;AAOA;EACE,aAAA;EACA,mBAAA;EACA,eAAA;AAJF;;AAOA;EACE,SAAA;EACA,YAAA;EACA,mBAAA;AAJF;;AAOA;EACE,YAAA;EACA,mBAAA;AAJF;;AAOA;EACE,YAAA;EACA,aAAA;AAJF;;AAOA;EACE,yBAzDc;EA0Dd,cAzDgB;EA0DhB,SAAA;EACA,mBAAA;EACA,uEAAA;EACA,kBAAA;EACA,eAAA;EACA,eAAA;AAJF;AAME;EACE,sBAAA;AAJJ;AAOE;EACE,UAAA;AALJ;;AASA;EACE,eAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,oCAAA;EACA,YAAA;AANF;AAQE;EACE,yBAAA;EACA,aAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AANJ","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\n\n$primary-color: #2fa8cc;\n$secondary-color: #f4f4f4;\n$box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: $primary-color;\n  font-family: 'Roboto', sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  padding: 20px;\n}\n\n.container {\n  background-color: $secondary-color;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 10px;\n  box-shadow: $box-shadow;\n  padding: 50px 20px;\n  text-align: center;\n  max-width: 100%;\n  width: 1040px;\n}\n\n.grid-player,.grid-computer,.placement-grid {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\nh3 {\n  margin: 0;\n  opacity: 0.5;\n  letter-spacing: 2px;\n}\n\nimg {\n  width: 100px;\n  margin-bottom: 20px;\n}\n\n.grid-player,.grid-computer,.placement-grid {\n  width: 400px;\n  height: 400px;\n}\n\n.btn {\n  background-color: $primary-color;\n  color: $secondary-color;\n  border: 0;\n  border-radius: 10px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 14px 40px;\n  font-size: 16px;\n  cursor: pointer;\n\n  &:active {\n    transform: scale(0.98);\n  }\n\n  &:focus {\n    outline: 0;\n  }\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n\n  .modal {\n    background-color: #f4f4f4;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ "./src/style/main.scss");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ship__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gameBoard__WEBPACK_IMPORTED_MODULE_2__);



console.log('Hi this is crazy');
})();

/******/ })()
;
//# sourceMappingURL=mainc2bc9f617c1b77bffa8d.js.map