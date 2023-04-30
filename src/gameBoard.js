const generateShip = require('./ship');

const SIZE = 10;
function gameBoard() {
  let coordinates = [];
  let missAttacks = [];

  function generateCoordinates() {
    for (let i = 0; i < SIZE; i++) {
      coordinates[i] = [];
      missAttacks[i] = [];
    for (let j = 0; j < SIZE; j++) {
      coordinates[i][j] = null;
      missAttacks[i][j] = false;
    }

    }
  }
  generateCoordinates();


  // function placeShip(ship, coordinate) {
  //   if(direction === "Horizontal") {
  //     for (let i = coordinate; i < coordinate + ship.ship.length; i++) {
  //       ship.ship.position.push(i);
  //       coordinates[i] = i;
  //     } 
  //     } else {
  //       for (let i = 0; i < ship.ship.length; i++) {
  //         ship.ship.position.push(coordinate);
  //         coordinate = coordinate + 10;
  //         coordinates[coordinate] = coordinate;
  //       } 
  //     }
  //   }

  function placeShip(ship, row, column, direction) {
    if (!isPlacementPossible(ship, row, column, direction)) return false

    if (direction === "Horizontal") {
      for (let i = 0; i < ship.ship.length; i++) {
        coordinates[row + i][column] = ship
      }
    } else {
      for (let i = 0; i < ship.ship.length; i++) {
        coordinates[row][column + i] = ship
      }
    }
    return true
  }

    function isPlacementPossible(ship, row, column, direction) {
        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE -1) {
          return false;
        }

        if(direction === "Horizontal") {
            if(row + ship.ship.length > SIZE) return false;
        } else {
          if(column + ship.ship.length > SIZE) return false;
        }

        // Case any of the field is already taken 
        if(direction === "Horizontal") {
          for(let i = 0; i < ship.ship.length; i++) {
            for(let x = -1; x <= 1; x++) {
              for(let y = -1; y <= 1; y++){
                if(row + x + i < 0 || row + x + i >= SIZE || column + y < 0 || column + y >= SIZE)
                continue
                if(coordinates[row + x + i][column + y]) return false;
              }
            }
          }
        } else {
          for (let i = 0; i < ship.ship.length; i++) {
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (
                  row + x < 0 ||
                  row + x >= SIZE ||
                  column + y + i < 0 ||
                  column + y + i >= SIZE
                )
                  continue
                if (coordinates[row + x][column + y + i]) return false
              }
            }
          }
        }
        return true
        
    }

    function attackShip(hit) {
      for(let i = 0; i < carrier.ship.length; i++) {
        if(carrier.ship.position[i] === hit) {
          carrier.ship.hit('Hit');
        } 
      }
      for(let i = 0; i < battleShip.ship.length; i++) {
        if(battleShip.ship.position[i] === hit) {
          battleShip.ship.hit('Hit');
        } 
      }
      for(let i = 0; i < destroyer.ship.length; i++) {
        if(destroyer.ship.position[i] === hit) {
          destroyer.ship.hit('Hit');
        } 
      }
      for(let i = 0; i < submarine.ship.length; i++) {
        if(submarine.ship.position[i] === hit) {
          submarine.ship.hit('Hit');
        } 
      }
      for(let i = 0; i < patrol.ship.length; i++) {
        if(patrol.ship.position[i] === hit) {
          submarine.ship.hit('Hit');
        } 
      }
    }

    // function receiveAttack(coordinate) {
    //   if(coordinates[coordinate] === null) {
    //     coordinates[coordinate] = 'Miss';
    //     missAttacks.push(coordinate);
        
    //   } else {
    //     attackShip(coordinate);
    //   }
    // }

    function receiveAttack(row, column) {
      if (row < 0 || row >= SIZE || column < 0 || column >= SIZE) {
        return false
      }
  
      if (coordinates[row][column]) {
        let hitIndex = 0
        // is vertical
        if (column > 0 && coordinates[row][column - 1]) {
          let i = 1
          while (column - i >= 0 && coordinates[row][column - i]) {
            hitIndex++
            i++
          }
        }
        // is horizontal
        else if (row > 0 && coordinates[row - 1][column]) {
          let i = 1
          while (row - i >= 0 && coordinates[row - i][column]) {
            hitIndex++
            i++
          }
        }
        coordinates[row][column].hit(hitIndex)
        return true
      } else {
        missAttacks[row][column] = true
        return false
      }
    }
    
    // function shipSunk() {
    //   if (carrier.ship.isSunk() === true && battleShip.ship.isSunk() === true && 
    //       destroyer.ship.isSunk() === true && submarine.ship.isSunk() === true && patrol.ship.isSunk() === true ) {
    //     console.log("Computer Win");
    //   } else {
    //     console.log("You Win!");
    //   }
    // }
    // shipSunk();

    // Placing all the ship at different coordinates
    function placeShipRandomly() {
      const ships = [];
      const carrier = generateShip(5);
      const battleShip = generateShip(4);
      const destroyer = generateShip(3);
      const submarine = generateShip(2);
      const patrol = generateShip(1);
      ships.push(carrier, battleShip, destroyer, submarine, patrol);

      let shipPlacement = 0

      while(shipPlacement < 5) {
        const row = Math.floor(Math.random() * 10)
        const column = Math.floor(Math.random() * 10)
        const direction = Math.floor(Math.random() * 2) === 1 ? "Horizontal" : 'Vertical';
        if(placeShip(ships[shipPlacement], row, column, direction))
        shipPlacement++;
      }

    }
    placeShipRandomly();

    return {coordinates, missAttacks, placeShip, receiveAttack};

  }

  const newGameBoard = gameBoard();

  console.log(newGameBoard.coordinates);

module.exports = gameBoard;
