import generateShip from './ship';

function gameBoard() {
  const coordinates = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];
  for (let i = 0; i < coordinates.length; i++) {
    if (i === 'C') {
      const biggestShip = generateShip(5);
      for (let j = 0; j < biggestShip.ship.length; j++) {
        biggestShip.position.push(coordinates[i]);
      }
      console.log(biggestShip.ship.position);
    }
  }
}
