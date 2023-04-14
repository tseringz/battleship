function generateShip(shipLength) {
  const ship = {
    length: shipLength,
    hitCounter: [],
    hit: function (hitCoordinate) {
      if (this.hitCounter.length < shipLength) {
        this.hitCounter.push(hitCoordinate);
      }
      return this.hitCounter.length;
    },
    isSunk: function () {
      if (this.hitCounter.length === shipLength) {
        return true;
      }
      return false;
    },
  };
  return { ship };
}


module.exports = generateShip;
