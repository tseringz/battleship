const generateShip = require('../src/ship');
const gameBoard = require('../src/gameBoard');

describe('Gameboard module', () => {
  let newGameBoard;
  beforeEach(() => {
    newGameBoard = gameBoard();
  })

  test('place ship at specific coordinates', () => {
    expect(JSON.stringify(gameBoard.placeShip(biggerShip, [1,2,3,4]))).toBeTruthy();
  });

});





test('place ship at specific coordinates', () => {
  const placeCoordinates = JSON.stringify(['F', 3]);
  const newShip = generateShip(4);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
   if (JSON.stringify(newGameBoard.newCoordinates[i]) === placeCoordinates) {
      for (let j = 0; j < newShip.ship.length; j++) {
        newShip.ship.position.push(newGameBoard.newCoordinates[i]);
        i++;
      }
    }
  }

  expect(JSON.stringify(newShip.ship.position)).toEqual(
    JSON.stringify([
      ['F', 3],
      ['F', 4],
      ['F', 5],
      ['F', 6],
    ])
  );
});

test('track how many hit ship gets', () => {
  const attackCoordinates = JSON.stringify(['F', 6]);
  const missCoordinates = [];
  const newShip = generateShip(4);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6],];
  const newGameBoard = gameBoard();
    for (let j = 0; j < newShip.ship.position.length; j++) {
      if (attackCoordinates === JSON.stringify(newShip.ship.position[j])) {
        newShip.ship.hit();
      } else {
        missCoordinates.push('missed');
      }
    }
  expect(newShip.ship.counter.length).toBe(1);
});

test('track how many hit ship gets', () => {
  const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['G', 7]];
  const newShip = generateShip(4);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6]];

    for (let j = 0; j < newShip.ship.position.length; j++) {
    for (let i = 0; i < attackCoordinates.length; i++) {
      if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
        newShip.ship.hit();
      } 
    }
  }
  expect(newShip.ship.counter.length).toBe(3);
});

test('Ship sunk by hitting all the coordinates', () => {
  const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['F', 7], ['F', 3]];
  const newShip = generateShip(5);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6],
  ['F', 7]];
  for (let j = 0; j < newShip.ship.position.length; j++) {
    for (let i = 0; i < attackCoordinates.length; i++) {
      if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
        newShip.ship.hit();
    }
  }
}
  expect(newShip.ship.isSunk()).toBe(true);
});

test('Ship stands until enemy hits all the coordinates', () => {
  const attackCoordinates = [['F', 6], ['F', 5], ['F', 4], ['F', 7], ['G', 3]];
  const newShip = generateShip(5);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6],
  ['F', 7]];
  for (let j = 0; j < newShip.ship.position.length; j++) {
    for (let i = 0; i < attackCoordinates.length; i++) {
      if (JSON.stringify(attackCoordinates[i]) === JSON.stringify(newShip.ship.position[j])) {
        newShip.ship.hit();
    }
  }
  }
  expect(newShip.ship.isSunk()).toBe(false);
});


test('Check missed coordinate when shots', () => {
  const attackCoordinates = ['F', 3];
  const newShip = generateShip(5);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6],
  ['F', 7]];
    const result = newShip.ship.position.find(coordinate => JSON.stringify(coordinate) === JSON.stringify(attackCoordinates));
  expect(result).toEqual(['F', 3]);
});

test('Check if shot missed ', () => {
  const attackCoordinates = ['G', 3];
  const newShip = generateShip(5);
  newShip.ship.position = [['F', 3],
  ['F', 4],
  ['F', 5],
  ['F', 6],
  ['F', 7]];
    const result = newShip.ship.position.find(coordinate => JSON.stringify(coordinate) === JSON.stringify(attackCoordinates));
  expect(result).toBeUndefined();
});