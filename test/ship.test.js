const generateShip = require('../src/ship');

describe('generate ships using factory function', () =>{
  let biggestShip;
  let biggerShip;

  beforeEach(() => {
    biggestShip = generateShip(5);
    biggerShip = generateShip(4);
  })

  test('get the length of the biggest ship', () => {
    expect(biggestShip.ship.length).toBe(5);
  })

  test('get the length of the bigger ship', () => {
    expect(biggerShip.ship.length).toBe(4);
  })

  test('accept hits', () => {
    biggestShip.ship.hit(10);
    expect(biggestShip.ship.hitCounter).toEqual([10]);
  })

  test('accept multiple hits', () => {
    biggerShip.ship.hit(11);
    biggerShip.ship.hit(12);
    biggerShip.ship.hit(13);
    expect(biggerShip.ship.hitCounter).toEqual([11, 12, 13])
  })

  test('check if ship sunk', () => {
    biggerShip.ship.hit(11);
    biggerShip.ship.hit(12);
    biggerShip.ship.hit(13);
    expect(biggerShip.ship.isSunk()).toBeFalsy();
  })

  test('check if ship sunk', () => {
    biggerShip.ship.hit(11);
    biggerShip.ship.hit(12);
    biggerShip.ship.hit(13);
    biggerShip.ship.hit(14);
    expect(biggerShip.ship.isSunk()).toBeTruthy();
  })
})


