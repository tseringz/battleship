const Players = require('../src/player');

describe('Players ', () => {
  let newPlayer;
  beforeEach(() => {
    newPlayer = Players();
  })

    test('check player status', () => {
        expect(newPlayer.playerOne).toBe(true);
    })

    test('check computer had played', () => {
       newPlayer.playerTurn();
       expect(newPlayer.randomArray.length).toBe(1);
    })

    test('check if computer had played 100 times', () => {
        for (let i = 0; i < 100; i++) {
            newPlayer.playerTurn();
        }
        expect(newPlayer.randomArray.length).toBe(100);
    })

    test('check if computer had repeated the number', () => {
        for (let i = 0; i < 100; i++) {
            newPlayer.playerTurn();
        }
        function findDuplicates(arr) {
            return arr.filter((currentValue, currentIndex) =>
            arr.indexOf(currentValue) !== currentIndex);
         }
         const newArray = findDuplicates(newPlayer.randomArray);
        expect(newArray.length).toBe(0);
    })
})