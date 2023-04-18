const generateShip = require('./ship');


function gameBoard() {
  let coordinates = [];
  let missAttacks = [];
  let direction = 'Horizontal';

  const carrier = generateShip(5);
  const battleShip = generateShip(4);
  const destroyer = generateShip(3);
  const submarine = generateShip(2);
  const patrol = generateShip(1);

  function generateCoordinates() {
    for (let i = 0; i < 100; i++) {
      coordinates.push(null);
    }
  }
  generateCoordinates();


  function placeShip(ship, coordinate) {
    if(direction === "Horizontal") {
      for (let i = coordinate; i < coordinate + ship.ship.length; i++) {
        ship.ship.position.push(i);
        coordinates[i] = i;
      } 
      } else {
        ship.ship.position.push(i + 10);
        coordinates[i + 10] = i + 10;
      }
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

    function receiveAttack(coordinate) {
      if(coordinates[coordinate] === null) {
        coordinates[coordinate] = 'Miss';
        missAttacks.push(coordinate);
        
      } else {
        attackShip(coordinate);
      }
    }
    

    function shipSunk() {
      if (carrier.ship.isSunk() === true && battleShip.ship.isSunk() === true && 
      destroyer.ship.isSunk() === true && submarine.ship.isSunk() === true && patrol.ship.isSunk() === true ) {
        console.log("Computer Win");
      } else {
        console.log("You Win!");
      }
    }
    shipSunk();

    return {carrier, coordinates, missAttacks, placeShip, receiveAttack};

  }

module.exports = gameBoard;
