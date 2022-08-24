const generateShip = require('../src/ship');

test('count hit until the length of the ship', () => {
  const newShip = generateShip(4);
  expect(newShip.ship.hit()).toBe(1);
});

test('count hit until the length of the ship', () => {
  const newShip = generateShip(4);
  expect(newShip.ship.isSunk()).toBeFalsy();
});

test('count hit until the length of the ship', () => {
    const newShip = generateShip(5);
  for (let i = 0; i < 5; i++) {
    newShip.ship.hit();
  }
  expect(newShip.ship.isSunk()).toBeTruthy();
});
