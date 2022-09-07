const generateShip = require('../src/ship');
const gameBoard = require('../src/gameBoard');

test('place ship at spacific coorinates', () => {
  const attackCoordinates = JSON.stringify(['F', 3]);
  const newShip = generateShip(4);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
      for (let j = 0; j < newShip.ship.length; j++) {
        newShip.ship.position.push(newGameBoard.newCoordinates[i]);
        i++;
      }
    }
  }
  expect(JSON.stringify(newShip.ship.position)).toBe(
    JSON.stringify([
      ['F', 3],
      ['F', 4],
      ['F', 5],
      ['F', 6],
    ])
  );
});

test('place ship at spacific coorinates', () => {
  const attackCoordinates = JSON.stringify(['F', 3]);
  const newShip = generateShip(4);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
      for (let j = 0; j < newShip.ship.length; j++) {
        newShip.ship.position.push(newGameBoard.newCoordinates[i]);
        i++;
      }
    }
  }
  expect(JSON.stringify(newShip.ship.position)).toBe(
    JSON.stringify([
      ['F', 3],
      ['F', 4],
      ['F', 5],
      ['F', 6],
    ])
  );
});

test('track how many hit ship gets', () => {
  const attackCoordinates = JSON.stringify(['F', 3]);
  const missCoordinates = [];
  const newShip = generateShip(4);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
      newShip.ship.hit();
    } else {
      missCoordinates.push('missed');
    }
  }
  expect(newShip.ship.counter.length).toBe(1);
});

test('check if a ship get sunk', () => {
  const attackCoordinates = JSON.stringify(['F', 3]);
  const missCoordinates = [];
  const shipLength = 5;
  const newShip = generateShip(shipLength);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
      for (let j = 0; j < newShip.ship.length; j++) {
        newShip.ship.hit();
      }
    } else {
      missCoordinates.push('missed cooridinates');
    }
  }
  expect(newShip.ship.counter.length).toBe(5);
});

test('check if a ship get sunk', () => {
  const attackCoordinates = JSON.stringify(['F', 3]);
  const missCoordinates = [];
  const shipLength = 5;
  const newShip = generateShip(shipLength);
  const newGameBoard = gameBoard();
  for (let i = 0; i < newGameBoard.newCoordinates.length; i++) {
    if (JSON.stringify(newGameBoard.newCoordinates[i]) === attackCoordinates) {
      for (let j = 0; j < newShip.ship.length; j++) {
        newShip.ship.hit();
      }
    } else {
      missCoordinates.push('missed cooridinates');
    }
  }
  expect(newShip.ship.counter.length).toBe(5);
});
