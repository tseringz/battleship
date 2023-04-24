/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var generateShip = __webpack_require__(/*! ./ship */ "./src/ship.js");

function gameBoard() {
  var coordinates = [];
  var missAttacks = [];
  var direction = 'Horizontal';
  var carrier = generateShip(5);
  var battleShip = generateShip(4);
  var destroyer = generateShip(3);
  var submarine = generateShip(2);
  var patrol = generateShip(1);

  function generateCoordinates() {
    for (var _i = 0; _i < 100; _i++) {
      coordinates.push('null');
    }
  }

  generateCoordinates();

  function placeShip(ship, coordinate) {
    if (direction === "Horizontal") {
      for (var _i2 = coordinate; _i2 < coordinate + ship.ship.length; _i2++) {
        ship.ship.position.push(_i2);
        coordinates[_i2] = _i2;
      }
    } else {
      ship.ship.position.push(i + 10);
      coordinates[i + 10] = i + 10;
    }
  }

  function attackShip(hit) {
    for (var _i3 = 0; _i3 < carrier.ship.length; _i3++) {
      if (carrier.ship.position[_i3] === hit) {
        carrier.ship.hit('Hit');
      }
    }

    for (var _i4 = 0; _i4 < battleShip.ship.length; _i4++) {
      if (battleShip.ship.position[_i4] === hit) {
        battleShip.ship.hit('Hit');
      }
    }

    for (var _i5 = 0; _i5 < destroyer.ship.length; _i5++) {
      if (destroyer.ship.position[_i5] === hit) {
        destroyer.ship.hit('Hit');
      }
    }

    for (var _i6 = 0; _i6 < submarine.ship.length; _i6++) {
      if (submarine.ship.position[_i6] === hit) {
        submarine.ship.hit('Hit');
      }
    }

    for (var _i7 = 0; _i7 < patrol.ship.length; _i7++) {
      if (patrol.ship.position[_i7] === hit) {
        submarine.ship.hit('Hit');
      }
    }
  }

  function receiveAttack(coordinate) {
    if (coordinates[coordinate] === null) {
      coordinates[coordinate] = 'Miss';
      missAttacks.push(coordinate);
    } else {
      attackShip(coordinate);
    }
  }

  function shipSunk() {
    if (carrier.ship.isSunk() === true && battleShip.ship.isSunk() === true && destroyer.ship.isSunk() === true && submarine.ship.isSunk() === true && patrol.ship.isSunk() === true) {
      console.log("Computer Win");
    } else {
      console.log("You Win!");
    }
  }

  shipSunk(); // Placing all the ship at different coordinates

  placeShip(carrier, 4);
  placeShip(battleShip, 15);
  placeShip(destroyer, 40);
  placeShip(submarine, 60);
  placeShip(patrol, 80);
  return {
    carrier: carrier,
    coordinates: coordinates,
    missAttacks: missAttacks,
    placeShip: placeShip,
    receiveAttack: receiveAttack
  };
}

module.exports = gameBoard;

/***/ }),

/***/ "./src/gameBoardUI.js":
/*!****************************!*\
  !*** ./src/gameBoardUI.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameModal": () => (/* binding */ gameModal),
/* harmony export */   "placeShips": () => (/* binding */ placeShips)
/* harmony export */ });
var gameBoard = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");

var Players = __webpack_require__(/*! ./player */ "./src/player.js");

function gameStart() {
  var newPlayers = Players();
  var newGameBoard = gameBoard();
  var playerBoard = document.querySelector('.player-board');
  var computerBoard = document.querySelector('.computer-board');
  var placementBoard = document.querySelector('.placement-grid');
  var newGrid;

  for (var i = 0; i < 100; i++) {
    newGrid = document.createElement('button');
    newGrid.value = "".concat(newGameBoard.coordinates[i]);
    newGrid.classList.add('player-grid');
    newGrid.style.border = '0.5px solid black';
    playerBoard.appendChild(newGrid);
  }

  for (var _i = 0; _i < 100; _i++) {
    newGrid = document.createElement('button');
    newGrid.value = "".concat(newGameBoard.coordinates[_i]);
    newGrid.classList.add('computer-grid');
    newGrid.style.border = '0.5px solid black';
    computerBoard.appendChild(newGrid);
  }

  for (var _i2 = 0; _i2 < 100; _i2++) {
    newGrid = document.createElement('button');
    newGrid.value = "".concat(newGameBoard.coordinates[_i2]);
    newGrid.classList.add('ship-placement-grid');
    newGrid.style.border = '0.5px solid black';
    placementBoard.appendChild(newGrid);
  }

  return {
    newPlayers: newPlayers
  };
}

function gameModal() {
  var newGame = gameStart();
  var playerBoardGrids = document.querySelectorAll('.player-grid');
  var computerBoardGrids = document.querySelectorAll('.computer-grid');
  computerBoardGrids.forEach(function (computerBoardGrid) {
    computerBoardGrid.addEventListener('click', function (e) {
      console.log('clicked');
      newGame.newPlayers.playerTurn();
      console.log(newGame.newPlayers.randomArray);

      if (computerBoardGrid.value === 'null') {
        computerBoardGrid.style.backgroundColor = "blue";
      } else {
        computerBoardGrid.style.backgroundColor = "red";
      }

      computerTurn();
    });
  });

  function computerTurn() {
    for (var i = 0; i < playerBoardGrids.length; i++) {
      for (var j = 0; j < newGame.newPlayers.randomArray.length; j++) {
        if (playerBoardGrids[newGame.newPlayers.randomArray[j]].value === 'null') {
          playerBoardGrids[newGame.newPlayers.randomArray[j]].style.backgroundColor = "blue";
        } else {
          playerBoardGrids[newGame.newPlayers.randomArray[j]].style.backgroundColor = "red";
        }
      }
    }
  }
}

function placeShips() {
  var playerBoardGrids = document.querySelectorAll('.ship-placement-grid');

  var _loop = function _loop(i) {
    playerBoardGrids[i].addEventListener('mouseover', function () {
      playerBoardGrids[i].style.backgroundColor = 'blue';
    });
  };

  for (var i = 0; i < 5; i++) {
    _loop(i);
  }
}



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var generateShip = __webpack_require__(/*! ./ship */ "./src/ship.js");

var gameBoard = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");

function Players() {
  var playerOne = true;
  var computer = Math.floor(Math.random() * 100);
  var randomArray = [];

  function playerTurn() {
    playerOne = false;

    if (playerOne === false) {
      computer = Math.floor(Math.random() * 100);

      while (randomArray.includes(computer)) {
        computer = Math.floor(Math.random() * 100);
      }

      randomArray.push(computer);
      playerOne = true;
    }
  }

  return {
    playerOne: playerOne,
    computer: computer,
    playerTurn: playerTurn,
    randomArray: randomArray
  };
}

module.exports = Players;

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

function generateShip(shipLength) {
  var ship = {
    length: shipLength,
    hitCounter: [],
    position: [],
    hit: function hit(hitCoordinate) {
      if (this.hitCounter.length < shipLength) {
        this.hitCounter.push(hitCoordinate);
      }

      return this.hitCounter.length;
    },
    isSunk: function isSunk() {
      if (this.hitCounter.length === shipLength) {
        return true;
      }

      return false;
    }
  };
  return {
    ship: ship
  };
}

module.exports = generateShip;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: #2fa8cc;\n  font-family: \"Roboto\", sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  padding: 20px;\n}\n\n.container {\n  background-color: #f4f4f4;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 10px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 50px 20px;\n  text-align: center;\n  max-width: 100%;\n  width: 1040px;\n}\n\n.grid-player, .grid-computer, .placement-grid {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\nh3 {\n  margin: 0;\n  opacity: 0.5;\n  letter-spacing: 2px;\n}\n\nimg {\n  width: 100px;\n  margin-bottom: 20px;\n}\n\n.player-board, .computer-board, .placement-grid {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  border: 0.5px solid black;\n  width: 400px;\n  height: 400px;\n}\n\n.btn {\n  background-color: #2fa8cc;\n  color: #f4f4f4;\n  border: 0;\n  border-radius: 10px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 14px 40px;\n  font-size: 16px;\n  cursor: pointer;\n}\n.btn:active {\n  transform: scale(0.98);\n}\n.btn:focus {\n  outline: 0;\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n}\n.modal-wrapper .modal {\n  background-color: #f4f4f4;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#ball {\n  animation-duration: 2s;\n  animation-name: change-color;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n}", "",{"version":3,"sources":["webpack://./src/style/main.scss"],"names":[],"mappings":"AAMA;EACE,sBAAA;AAJF;;AAOA;EACE,yBATc;EAUd,iCAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,aAAA;EACA,gBAAA;EACA,SAAA;EACA,aAAA;AAJF;;AAOA;EACE,yBArBgB;EAsBhB,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,mBAAA;EACA,wEAzBW;EA0BX,kBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;AAJF;;AAOA;EACE,aAAA;EACA,mBAAA;EACA,eAAA;AAJF;;AAOA;EACE,SAAA;EACA,YAAA;EACA,mBAAA;AAJF;;AAOA;EACE,YAAA;EACA,mBAAA;AAJF;;AAOA;EACE,aAAA;EACA,sCAAA;EACA,sCAAA;EACA,yBAAA;EACA,YAAA;EACA,aAAA;AAJF;;AAQA;EACE,yBA9Dc;EA+Dd,cA9DgB;EA+DhB,SAAA;EACA,mBAAA;EACA,uEAAA;EACA,kBAAA;EACA,eAAA;EACA,eAAA;AALF;AAOE;EACE,sBAAA;AALJ;AAQE;EACE,UAAA;AANJ;;AAUA;EACE,eAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,oCAAA;EACA,YAAA;AAPF;AASE;EACE,yBAAA;EACA,aAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AAPJ;;AAYA;EACE,sBAAA;EACA,4BAAA;EACA,mCAAA;EACA,8BAAA;AATF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\n\n$primary-color: #2fa8cc;\n$secondary-color: #f4f4f4;\n$box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: $primary-color;\n  font-family: 'Roboto', sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  padding: 20px;\n}\n\n.container {\n  background-color: $secondary-color;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 10px;\n  box-shadow: $box-shadow;\n  padding: 50px 20px;\n  text-align: center;\n  max-width: 100%;\n  width: 1040px;\n}\n\n.grid-player,.grid-computer,.placement-grid {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\nh3 {\n  margin: 0;\n  opacity: 0.5;\n  letter-spacing: 2px;\n}\n\nimg {\n  width: 100px;\n  margin-bottom: 20px;\n}\n\n.player-board,.computer-board,.placement-grid {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  border: 0.5px solid black;\n  width: 400px;\n  height: 400px;\n}\n\n\n.btn {\n  background-color: $primary-color;\n  color: $secondary-color;\n  border: 0;\n  border-radius: 10px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  padding: 14px 40px;\n  font-size: 16px;\n  cursor: pointer;\n\n  &:active {\n    transform: scale(0.98);\n  }\n\n  &:focus {\n    outline: 0;\n  }\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n\n  .modal {\n    background-color: #f4f4f4;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n}\n\n\n#ball {\n  animation-duration: 2s;\n  animation-name: change-color;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ "./src/style/main.scss");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ship__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gameBoardUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoardUI */ "./src/gameBoardUI.js");



console.log('Hi this is crazy');
(0,_gameBoardUI__WEBPACK_IMPORTED_MODULE_2__.gameModal)();
(0,_gameBoardUI__WEBPACK_IMPORTED_MODULE_2__.placeShips)();
})();

/******/ })()
;
//# sourceMappingURL=main5596d79e465d7fc33764.js.map