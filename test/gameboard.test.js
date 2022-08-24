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
  expect(newShip.ship.position).toBe([
    ['F', 3],
    ['F', 4],
    ['F', 5],
    ['F', 6],
    ['F', 7],
  ]);
});
