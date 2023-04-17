const generateShip = require('../src/ship');
const gameBoard = require('../src/gameBoard');

describe('Game board module', () => {
  let newGameBoard;
  beforeEach(() => {
    newGameBoard = gameBoard();
  })

  test('calculate game board coordinates length', () => { 
    expect(newGameBoard.coordinates.length).toEqual(100);
  });

  test('coordinates value is null', () => {
    expect(newGameBoard.coordinates[12]).toEqual(null);
  })

  test('Place the biggest ship at the board', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 5);
    expect(newGameBoard.carrier.ship.position).toEqual([5, 6, 7, 8, 9]);
  });

  test('receive attack at the unoccupied area of the board', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(20);
    expect(newGameBoard.coordinates[20]).toEqual('Miss');
  });

  test('receive attack at the carrier ship', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(17);
    expect(newGameBoard.carrier.ship.hitCounter.length).toBe(1);
  })

  test('receive multiple attack at the carrier ship', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(13);
    newGameBoard.receiveAttack(14);
    newGameBoard.receiveAttack(15);
    newGameBoard.receiveAttack(16);
    newGameBoard.receiveAttack(17);
    expect(newGameBoard.carrier.ship.hitCounter.length).toBe(5);
  })

  test('check if carrier ship gets hit', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(15);
    expect(newGameBoard.carrier.ship.hitCounter[0]).toEqual("Hit");
  })

  test('check if carrier sunk when received 5 attack', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(13);
    newGameBoard.receiveAttack(14);
    newGameBoard.receiveAttack(15);
    newGameBoard.receiveAttack(16);
    newGameBoard.receiveAttack(17);
    expect(newGameBoard.carrier.ship.isSunk()).toBeTruthy();
  })

  test('check if carrier sunk when received 5 attack', () => {
    newGameBoard.placeShip(newGameBoard.carrier, 13);
    newGameBoard.receiveAttack(13);
    newGameBoard.receiveAttack(14);
    newGameBoard.receiveAttack(15);
    newGameBoard.receiveAttack(16);
    expect(newGameBoard.carrier.ship.isSunk()).toBeFalsy();
  })

});





// test('place ship at specific coordinates', () => {
//   const placeCoordinates = JSON.stringify(['F', 3]);
//   const newShip = generateShip(4);
//   const newGameBoard = gameBoard();
//   for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
//    if (JSON.stringify(newGameBoard.newCoordinates[i]) === placeCoordinates) {
//       for (let j = 0; j < newShip.ship.length; j++) {
//         newShip.ship.position.push(newGameBoard.newCoordinates[i]);
//         i++;
//       }
//     }
//   }

//   expect(JSON.stringify(newShip.ship.position)).toEqual(
//     JSON.stringify([
//       ['F', 3],
//       ['F', 4],
//       ['F', 5],
//       ['F', 6],
//     ])
//   );
// });

// test('track how many hit ship gets', () => {
//   const attackCoordinates = JSON.stringify(['F', 6]);
//   const missCoordinates = [];
//   const newShip = generateShip(4);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6],];
//   const newGameBoard = gameBoard();
//     for (let j = 0; j < newShip.ship.position.length; j++) {
//       if (attackCoordinates === JSON.stringify(newShip.ship.position[j])) {
//         newShip.ship.hit();
//       } else {
//         missCoordinates.push('missed');
//       }
//     }
//   expect(newShip.ship.counter.length).toBe(1);
// });

// test('track how many hit ship gets', () => {
//   const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['G', 7]];
//   const newShip = generateShip(4);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6]];

//     for (let j = 0; j < newShip.ship.position.length; j++) {
//     for (let i = 0; i < attackCoordinates.length; i++) {
//       if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
//         newShip.ship.hit();
//       } 
//     }
//   }
//   expect(newShip.ship.counter.length).toBe(3);
// });

// test('Ship sunk by hitting all the coordinates', () => {
//   const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['F', 7], ['F', 3]];
//   const newShip = generateShip(5);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6],
//   ['F', 7]];
//   for (let j = 0; j < newShip.ship.position.length; j++) {
//     for (let i = 0; i < attackCoordinates.length; i++) {
//       if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
//         newShip.ship.hit();
//     }
//   }
// }
//   expect(newShip.ship.isSunk()).toBe(true);
// });

// test('Ship stands until enemy hits all the coordinates', () => {
//   const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['F', 7], ['G', 3]];
//   const newShip = generateShip(5);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6],
//   ['F', 7]];
//   for (let j = 0; j < newShip.ship.position.length; j++) {
//     for (let i = 0; i < attackCoordinates.length; i++) {
//       if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
//         newShip.ship.hit();
//     }
//   }
//   }
//   expect(newShip.ship.isSunk()).toBe(false);
// });


// test('Check missed coordinate when shots', () => {
//   const attackCoordinates = ['F', 3];
//   const newShip = generateShip(5);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6],
//   ['F', 7]];
//     const result = newShip.ship.position.find(coordinate => JSON.stringify(coordinate) === JSON.stringify(attackCoordinates));
//   expect(result).toEqual(['F', 3]);
// });

// test('Check if shot missed ', () => {
//   const attackCoordinates = ['G', 3];
//   const newShip = generateShip(5);
//   newShip.ship.position = [['F', 3],
//   ['F', 4],
//   ['F', 5],
//   ['F', 6],
//   ['F', 7]];
//     const result = newShip.ship.position.find(coordinate => JSON.stringify(coordinate) === JSON.stringify(attackCoordinates));
//   expect(result).toBeUndefined();
// });