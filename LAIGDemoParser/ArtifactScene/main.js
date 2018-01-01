// From https://github.com/EvanHahn/ScriptInclude
include = function() {
  function f() {
    var a = this.readyState;
    (!a || /ded|te/.test(a)) && (c--, !c && e && d())
  }
  var a = arguments, b = document, c = a.length, d = a[c - 1], e = d.call;
  e && c--;
  for (var g, h = 0; c > h; h++)
    g = b.createElement('script'), g.src = arguments[h], g.async = !0,
    g.onload = g.onerror = g.onreadystatechange = f,
    (b.head || b.getElementsByTagName('head')[0]).appendChild(g)
};
serialInclude = function(a) {
  var b = console, c = serialInclude.l;
  if (a.length > 0)
    c.splice(0, 0, a);
  else
    b.log('Done!');
  if (c.length > 0) {
    if (c[0].length > 1) {
      var d = c[0].splice(0, 1);
      b.log('Loading ' + d + '...');
      include(d, function() {
        serialInclude([]);
      });
    }
  } else
    b.log('Finished.');
};
serialInclude.l = new Array();

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[decodeURIComponent(key)] = decodeURIComponent(value);
      });
  return vars;
};

var testeBoard = null;
var boardArray = null;
var scene = null;
var player1 = null;
var player2 = null;
var gameType = null;
var gameDifficulty = null;
var checkOnetime = false;

serialInclude([
  '../lib/CGF.js',
  'XMLscene.js',
  'MySceneGraph.js',
  'MyGraphNode.js',
  'MyGraphLeaf.js',
  'MyInterface.js',
  'Position.js',
  'Primitives/Cylinder.js',
  'Primitives/FrogPiece.js',
  'Primitives/Sphere.js',
  'Primitives/Rectangle.js',
  'Primitives/Triangle.js',
  'Primitives/Circle.js',
  'Animations/LinearAnimation.js',
  'Animations/CircularAnimation.js',
  'Animations/Animation.js',
  'Animations/BezierAnimation.js',
  'Animations/ComboAnimation.js',
  'Vecs.js',
  'GameEntities/HistoryKepper.js',
  'GameEntities/GameBoard.js',
  'GameEntities/SquareHitBox.js',
  'GameEntities/GamePieceManager.js',
  'GameEntities/GamePiece.js',
  'player.js',
  'GameEntities/HistoryKepper.js'
]);

var filenameToLoad = 'final.xml';


function play() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<script id="script" src="main.js"></script>
        <h1 id = "player1" style = "color: white; position: absolute; margin-left: 9em; margin-top:2em;">&#8680 ` +
      player1.name + `</h1>
        <h1 style = "color: white; position: absolute; margin-left: 15em;">` +
      'Score' +
      `</h1>
        <h1 id = "player1score" style = "color: white; position: absolute; margin-left: 16em; margin-top:2em;">` +
      player1.score + `</h1>
        <h1 id = "player2" style = "color: white; position: absolute; margin-left: 30em; margin-top:2em;">` + player2.name + `</h1>
        <h1 style = "color: white; position: absolute; margin-left: 26em;">` +
      'Score' +
      `</h1>
        <h1 id = "player2score" style = "color: white; position: absolute; margin-left: 27em; margin-top:2em;">` +
      player2.score + `</h1>`;

  this.insertBackButton();


  // Standard application, scene and interface setup
  var app = new CGFapplication(document.body);
  var myInterface = new MyInterface();
  var myScene = new XMLscene(myInterface);
  scene = myScene;
  scene.board = boardArray;
  scene.boardString = testeBoard;
  scene.player1 = player1;
  scene.player2 = player2;
  scene.gameType = gameType;
  scene.gameDifficulty = gameDifficulty;

  app.init();

  app.setScene(myScene);
  app.setInterface(myInterface);

  myInterface.setActiveCamera(myScene.camera);

  // get file name provided in URL, e.g.
  // http://localhost/myproj/?file=myfile.xml or use "demo.xml" as
  // default (assumes files in subfolder "scenes", check MySceneGraph
  // constructor)
  var file = 'final.xml';
  if (filenameToLoad != null) {
    file = filenameToLoad;
  }

  console.log('File to load:' + file);
  var filename = getUrlVars()['file'] || file;

  // create and load graph, and associate it to scene.
  // Check console for loading errors
  var myGraph = new MySceneGraph(filename, myScene);
  myGraph.board = testeBoard;

  // start
  app.run();
};


function player(name) {
  this.score = 0;
  this.name = name;
}


function insertBackButton() {
  let backButton = document.createElement('BUTTON');
  backButton.addEventListener('click', function refresh() {
    mainMenu();

  });

  backButton.className = 'backButton';
  backButton.innerHTML = 'Quit Game';
  document.getElementById('script').insertAdjacentElement(
      'beforebegin', backButton);
};

function mainMenu() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
    <div> 
        <img src="scenes/images/froglet.png" alt="logo" /> 
    </div>
    <br> <br> 
  <script id="script" src="main.js"> 
    function goBack() 
    { 
      let JsonRequest = "quit";
      let requestPort = 8082;
      let request = new XMLHttpRequest();
      request.open('GET', 'http://127.0.0.1:8082' + '/' + JsonRequest, true);
      request.onload = (function (response) {     
        window.history.back();
      }).bind(this);
      //request.onerror = onError; TODO VER O QUE FAZER
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send();
    }
  </script>

  <div id="optionsList">
        <div id="Play" onclick = "playMenu()"><button class = "button">Play</button></div> <br>
        <div onclick = "playMenu()"><button class = "button">Credits</button></div> <br>
        <div onclick = "goBack()"><button class = "button">Quit</button></div>
  </div>`;
};

function fileChange() {
  let x = document.querySelector('#sel').value;
  filenameToLoad = x;
  console.log(filenameToLoad);
}

function playMenu() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
          <div> 
            <img src="scenes/images/froglet.png" alt="logo" /> 
          </div> <br> <br>
					<script id="script" src="MyInterface.js"> </script>
          <div id="optionsList">
              <select id="sel" onchange="fileChange()">
                <option value="final.xml">final.xml</option>
                <option value="froglet.xml">froglet.xml</option>
              </select>
						<div id="Human" onclick = "HumanHumanFirstPlayer()"><button class = "button">Human vs Human</button></div> <br>
						<div id="HumanAI" onclick = "HumanAiDifficulty()"><button class = "button">Human vs AI</button></div> <br>
            <div id="AI" onclick = "AiAiDifficulty()"><button class = "button">AI vs AI</button></div> <br>
            <div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>
          </div>
          <script>

          testPrologConnection();
          
          function testPrologConnection() 
          {
              let JsonRequest = 'test(1,2)';
              let requestPort = 8082;
              let request = new XMLHttpRequest();
              request.open(
                  'GET',
                  'http://127.0.0.1:8082' +
                      '/' + JsonRequest,
                  true);
  
              request.onload = (function(response) 
              {
                  this.prologResponse = JSON.parse(response.target.response);
                  if (this.prologResponse[0] === -1)
                  {
                      let body = document.getElementsByTagName('body')[0];
                      body.innerHTML = '<h1> No connection with prolog </h1>';
                  }
              }).bind(this);
  
              request.onerror = function onError(e) {
                  let body = document.getElementsByTagName('body')[0];
                  body.innerHTML = '<h1> No connection with prolog </h1>';
              }
              request.setRequestHeader(
              'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  
              request.send();
          }
  
  
          function goBack() {
              let JsonRequest = "quit";
              let requestPort = 8082;
              let request = new XMLHttpRequest();
              request.open('GET', 'http://127.0.0.1:8082' + '/' + JsonRequest, true);
              request.onload = (function (response) {     
                  window.history.back();
              }).bind(this);
              //request.onerror = onError; TODO VER O QUE FAZER
              request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
              request.send();
          } 
      </script>`;
  requestStartBoard();
};

function HumanHumanFirstPlayer() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
          <div> 
            <img src="scenes/images/froglet.png" alt="logo" /> 
          </div> <br> <br>
					<script id="script" src="MyInterface.js"> </script>
          <div id="optionsList">
            <h2 style = "color:green;"> Choose the first player </h2> <br>
						<div id="Player1" onclick = "HumanHumanGame('Player 1','Player 2')"><button class = "button">Player 1</button></div> <br>
            <div id="Player2" onclick = "HumanHumanGame('Player 2','Player 1')"><button class = "button">Player 2</button></div> <br>
            <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
					</div>`;
}

function HumanHumanGame(firstPlayer, secondPlayer) {
  player1 = new player(firstPlayer);
  player2 = new player(secondPlayer);
  gameType = 0;
  gameDifficulty = 0;
  this.play();
}

function HumanAiDifficulty() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
    <div> 
    <img src="scenes/images/froglet.png" alt="logo" /> 
    </div>
    <br> <br>
				<script id="script" src="MyInterface.js"></script>
					<div id="Easy" onclick = "HumanAiFirstPlayer(1)"><button class = "button">Easy</button></div> <br>
          <div id="Hard" onclick = "HumanAiFirstPlayer(2)"><button class = "button">Hard</button></div> <br>
          <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
				</div>`;
};

function HumanAiFirstPlayer(difficulty) {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
      <div> 
        <img src="scenes/images/froglet.png" alt="logo" /> 
      </div> <br> <br>
      <script id="script" src="MyInterface.js"> </script>
      <div id="optionsList">
        <h2 style = "color:green;"> Choose the first player </h2> <br>
        <div id="Player1" onclick = "humanAiGame('Human', 'CPU',` +
      difficulty + `)"><button class = "button">Human</button></div> <br>
        <div id="Player2" onclick = "humanAiGame('CPU', 'Human',` +
      difficulty + `)"><button class = "button">Computer</button></div> <br>
        <div onclick = "HumanAiDifficulty()"><button class = "button">Go back</button></div> <br>
      </div>`;
}

function humanAiGame(firstPlayer, secondPlayer, difficulty) {
  player1 = new player(firstPlayer);
  player2 = new player(secondPlayer);
  gameType = 1;
  gameDifficulty = difficulty;
  this.play();
}

function AiAiDifficulty() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
    <div> 
    <img src="scenes/images/froglet.png" alt="logo" /> 
    </div>
        <br> <br>
				<script id="script" src="MyInterface.js"></script>
				<div id="optionsList">
					<div id="Easy" onclick = "AiAiFirstPlayer(1)"><button class = "button">Easy</button></div> <br>
          <div id="Hard" onclick = "AiAiFirstPlayer(2)"><button class = "button">Hard</button></div> <br>
          <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
				</div>`;
};

function AiAiFirstPlayer(difficulty) {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
      <div> 
        <img src="scenes/images/froglet.png" alt="logo" /> 
      </div> <br> <br>
      <script id="script" src="MyInterface.js"> </script>
      <div id="optionsList">
        <h2 style = "color:green;"> Choose the first player </h2> <br>
        <div id="Player1" onclick = "AiAiGame('CPU 1', 'CPU 2',` +
      difficulty +
      `)"><button class = "button">Computer 1</button></div> <br>
        <div id="Player2" onclick = "AiAiGame('CPU 2','CPU 1',` +
      difficulty + `)"><button class = "button">Computer 2</button></div> <br>
        <div onclick = "AiAiDifficulty()"><button class = "button">Go back</button></div> <br>
      </div>`;
}

function AiAiGame(firstPlayer, secondPlayer, difficulty) {
  player1 = new player(firstPlayer);
  player2 = new player(secondPlayer);
  gameType = 2;
  gameDifficulty = difficulty;
  this.play();
}

function firstMoveHuman(board, X, Y) {
  let JsonRequest = 'firstMoveOK(' + board + ',' + X + ',' + Y + ')';
  makeFirstMove(JsonRequest);
}

function moveHuman(board, X, Y, direction) {
  let JsonRequest =
      'moveOK(' + board + ',' + X + ',' + Y + ',' + direction + ')';
  makeMoveHuman(JsonRequest);
}

function firstMoveCom(board, difficulty) {
  if (scene.currentPlayer.name.indexOf('Human') < 0) {
    if (difficulty == 1) {
      let JsonRequest = 'firstMoveCOMEasy(' + board + ')';
      makeFirstMove(JsonRequest);
      this.checkOnetime = true;
    } else if (difficulty == 2) {
      let JsonRequest = 'firstMoveCOMHard(' + board + ')';
      makeFirstMove(JsonRequest);
      this.checkOnetime = true;
    }
  }
}

function MoveCom(board, difficulty) {
  if (!scene.stop) {
    if (difficulty == 1) {
      this.checkOnetime = true;
      let JsonRequest = 'moveCOMEasy(' + board + ')';
      makeMoveComEasy(JsonRequest);
    } else if (difficulty == 2) {
      this.checkOnetime = true;
      let JsonRequest = 'moveCOMHard(' + board + ')';
      makeMoveComHard(JsonRequest);
    }
  }
}

function makeFirstMove(JsonRequest) {
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload =
      (function(response) {
        let responseSplit = response.target.response.split('-');

        if (responseSplit[0] === -1)
          return;
        else if (responseSplit[0] == 'no')
          scene.isFirstMove = true;
        else if (responseSplit[0] == 'Syntax Error')
          scene.isFirstMove = true;
        else {
          testeBoard = (JSON.stringify(responseSplit[0]));
          testeBoard = testeBoard.replace(/['"]+/g, '');
          boardArray = JSON.parse(responseSplit[0]);
          scene.board = boardArray;
          scene.boardString = testeBoard;
          let xCoord = responseSplit[1];
          let yCoord = responseSplit[2];

          if (scene.currentPlayer == scene.player1) {
            scene.currentPlayer = scene.player2;
            document.getElementById('player1').innerHTML = scene.player1.name;
            document.getElementById('player2').innerHTML =
                '&#8680' + scene.player2.name;
          } else {
            scene.currentPlayer = scene.player1;
            document.getElementById('player1').innerHTML =
                '&#8680' + scene.player1.name;
            document.getElementById('player2').innerHTML = scene.player2.name;
          }
          scene.isFirstMove = false;
        }

      }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeMoveComEasy(JsonRequest) {
  if (!scene.isAnimating && scene.currentPlayer.name.indexOf('Human') < 0) {
    let requestPort = 8082;
    let request = new XMLHttpRequest();
    request.open(
        'GET',
        'http://127.0.0.1:8082' +
            '/' + JsonRequest,
        true);
    request.onload =
        (function(response) {
          let responseSplit = response.target.response.split('-');

          let xCoord = responseSplit[2];
          let yCoord = responseSplit[1];
          if (Number(xCoord) <= 9) xCoord += '00';
          if (Number(yCoord) <= 9) yCoord += '00';

          let peca = scene.pieceManager.pieceMap.get(xCoord + yCoord);
          if (responseSplit[0] === -1)
            scene.stop = true;
          else if (responseSplit[0] == 'no')
            scene.stop = true;
          else if (responseSplit[0] == 'Syntax Error')
            scene.stop = true;
          else if (responseSplit[0] == 'Bad Request')
            scene.stop = true;
          else {
            peca.moveTo(responseSplit[4], responseSplit[3]);
            testeBoard = (JSON.stringify(responseSplit[0]));
            testeBoard = testeBoard.replace(/['"]+/g, '');
            boardArray = JSON.parse(responseSplit[0]);
            scene.board = boardArray;
            scene.boardString = testeBoard;
            if (scene.currentPlayer == scene.player1) {
              if (responseSplit[6] == 'y') {
                scene.currentPlayer = scene.player1;
                scene.player1.score += JSON.parse(responseSplit[5]);
                player1.score = scene.player1.score;
                document.getElementById('player1score').innerHTML =
                    scene.player1.score;
              } else {
                scene.currentPlayer = scene.player2;
                document.getElementById('player1').innerHTML =
                    scene.player1.name;
                document.getElementById('player2').innerHTML =
                    '&#8680' + scene.player2.name;
                scene.player1.score += JSON.parse(responseSplit[5]);
                player1.score = scene.player1.score;
                document.getElementById('player1score').innerHTML =
                    scene.player1.score;
              }
            } else {
              if (responseSplit[6] == 'y') {
                scene.currentPlayer = scene.player2;
                scene.player2.score += JSON.parse(responseSplit[5]);
                player2.score = scene.player2.score;
                document.getElementById('player2score').innerHTML =
                    scene.player2.score;
              } else {
                scene.currentPlayer = scene.player1;
                document.getElementById('player1').innerHTML =
                    '&#8680' + scene.player1.name;
                document.getElementById('player2').innerHTML =
                    scene.player2.name;
                scene.player2.score += JSON.parse(responseSplit[5]);
                player2.score = scene.player2.score;
                document.getElementById('player2score').innerHTML =
                    scene.player2.score;
              }
            }
          }

        }).bind(this);
    // request.onerror = onError; TODO VER O QUE FAZER
    request.setRequestHeader(
        'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
  }
}

function makeMoveComHard(JsonRequest) {
  if (!scene.isAnimating && scene.currentPlayer.name.indexOf('Human') < 0) {
    let requestPort = 8082;
    let request = new XMLHttpRequest();
    request.open(
        'GET',
        'http://127.0.0.1:8082' +
            '/' + JsonRequest,
        true);
    request.onload =
        (function(response) {
          let responseSplit = response.target.response.split('-');

          let xCoord = responseSplit[2];
          let yCoord = responseSplit[1];
          if (Number(xCoord) <= 9) xCoord += '00';
          if (Number(yCoord) <= 9) yCoord += '00';

          let peca = scene.pieceManager.pieceMap.get(xCoord + yCoord);
          if (responseSplit[0] === -1)
            return;
          else if (responseSplit[0] == 'no')
            return;
          else if (responseSplit[0] == 'Syntax Error')
            return;
          else {
            let directionsArray = responseSplit[3];
            directionsArray = directionsArray.split(',');
            let xCoordToMove = Number(responseSplit[2]);
            let yCoordToMove = Number(responseSplit[1]);

            for (let i = 0; i < directionsArray.length; i++) {
              if (directionsArray[i] == '[S]' || directionsArray[i] == 'S]' ||
                  directionsArray[i] == '[S' || directionsArray[i] == 'S') {
                xCoordToMove += 2;
                yCoordToMove += 0;
              } else if (
                  directionsArray[i] == '[W]' || directionsArray[i] == 'W]' ||
                  directionsArray[i] == '[W' || directionsArray[i] == 'W') {
                xCoordToMove -= 2;
                yCoordToMove += 0;
              } else if (
                  directionsArray[i] == '[D]' || directionsArray[i] == 'D]' ||
                  directionsArray[i] == '[D' || directionsArray[i] == 'D') {
                xCoordToMove += 0;
                yCoordToMove += 2;
              } else if (
                  directionsArray[i] == '[A]' || directionsArray[i] == 'A]' ||
                  directionsArray[i] == '[A' || directionsArray[i] == 'A') {
                xCoordToMove += 0;
                yCoordToMove -= 2;
              }
            }

            peca.moveTo(xCoordToMove, yCoordToMove);

            testeBoard = (JSON.stringify(responseSplit[0]));

            testeBoard = testeBoard.replace(/['"]+/g, '');
            boardArray = JSON.parse(responseSplit[0]);
            scene.board = boardArray;
            scene.boardString = testeBoard;
            if (scene.currentPlayer == scene.player1) {
              scene.currentPlayer = scene.player2;
              document.getElementById('player1').innerHTML = scene.player1.name;
              document.getElementById('player2').innerHTML =
                  '&#8680' + scene.player2.name;
              scene.player1.score += JSON.parse(responseSplit[4]);
              player1.score = scene.player1.score;
              document.getElementById('player1score').innerHTML =
                  scene.player1.score;
            } else {
              scene.currentPlayer = scene.player1;
              document.getElementById('player1').innerHTML =
                  '&#8680' + scene.player1.name;
              document.getElementById('player2').innerHTML = scene.player2.name;
              scene.player2.score += JSON.parse(responseSplit[4]);
              player2.score = scene.player2.score;
              document.getElementById('player2score').innerHTML =
                  scene.player2.score;
            }
          }

        }).bind(this);
    // request.onerror = onError; TODO VER O QUE FAZER
    request.setRequestHeader(
        'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
  }
}


function makeMoveHuman(JsonRequest) {
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload =
      (function(response) {
        let responseSplit = response.target.response.split('-');

        let xCoord = responseSplit[5];
        let yCoord = responseSplit[6];
        if (Number(xCoord) <= 9) xCoord += '00';
        if (Number(yCoord) <= 9) yCoord += '00';

        let peca = scene.pieceManager.pieceMap.get(xCoord + yCoord);
        if (responseSplit[0] === -1)
          return;
        else if (responseSplit[0] == 'no')
          return;
        else if (responseSplit[0] == 'Syntax Error')
          return;
        else {
          peca.moveTo(responseSplit[1], responseSplit[2]);


          testeBoard = (JSON.stringify(responseSplit[0]));
          testeBoard = testeBoard.replace(/['"]+/g, '');
          boardArray = JSON.parse(responseSplit[0]);
          scene.board = boardArray;
          scene.boardString = testeBoard;

          if (scene.currentPlayer == scene.player1) {
            if (responseSplit[4] == 'y') {
              scene.firstClick = false;
              scene.lockSecondMove = true;
              scene.xFrog = responseSplit[1];
              scene.yFrog = responseSplit[2];
              scene.firstX = responseSplit[1];
              scene.firstY = responseSplit[2];
              scene.currentPlayer = scene.player1;
              scene.player1.score += JSON.parse(responseSplit[3]);
              player1.score = scene.player1.score;
              document.getElementById('player1score').innerHTML =
                  scene.player1.score;
            } else {
              scene.xFrog = responseSplit[1];
              scene.yFrog = responseSplit[2];
              let xCoord = scene.xFrog;
              let yCoord = scene.yFrog;
              if (Number(xCoord) <= 9) xCoord += '00';
              if (Number(yCoord) <= 9) yCoord += '00';

              scene.lockSecondMove = false;
              scene.selectedPiece =
                  scene.pieceManager.pieceMap.get(xCoord + yCoord);
              scene.selectedPiece.isSelected = false;

              scene.currentPlayer = scene.player2;
              document.getElementById('player1').innerHTML = scene.player1.name;
              document.getElementById('player2').innerHTML =
                  '&#8680' + scene.player2.name;
              scene.player1.score += JSON.parse(responseSplit[3]);
              player1.score = scene.player1.score;
              document.getElementById('player1score').innerHTML =
                  scene.player1.score;
            }
          } else {
            if (responseSplit[4] == 'y') {
              scene.firstClick = false;
              scene.lockSecondMove = true;
              scene.firstX = responseSplit[1];
              scene.firstY = responseSplit[2];
              scene.xFrog = responseSplit[1];
              scene.yFrog = responseSplit[2];
              scene.currentPlayer = scene.player2;
              scene.player2.score += JSON.parse(responseSplit[3]);
              player2.score = scene.player2.score;
              document.getElementById('player2score').innerHTML =
                  scene.player2.score;
            } else {
              scene.xFrog = responseSplit[1];
              scene.yFrog = responseSplit[2];
              let xCoord = scene.xFrog;
              let yCoord = scene.yFrog;
              if (Number(xCoord) <= 9) xCoord += '00';
              if (Number(yCoord) <= 9) yCoord += '00';

              scene.lockSecondMove = false;
              scene.selectedPiece =
                  scene.pieceManager.pieceMap.get(xCoord + yCoord);
              scene.selectedPiece.isSelected = false;

              scene.currentPlayer = scene.player1;
              document.getElementById('player1').innerHTML =
                  '&#8680' + scene.player1.name;
              document.getElementById('player2').innerHTML = scene.player2.name;
              scene.player2.score += JSON.parse(responseSplit[3]);
              player2.score = scene.player2.score;
              document.getElementById('player2score').innerHTML =
                  scene.player2.score;
            }
          }
        }
      }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}


function showCredits() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = '<img src="scenes/images/credits.png" alt="credits">';
  body.innerHTML +=
      '<div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>';
};

function requestStartBoard() {
  let JsonRequest = 'startBoard';
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) {
                     let responseSplit = response.target.response.split('-');

                     if (responseSplit[0] === -1)
                       return;
                     else if (responseSplit[0] == 'no')
                       return;
                     else if (responseSplit[0] == 'Syntax Error')
                       return;
                     else {
                       testeBoard = (JSON.stringify(responseSplit[0]));
                       testeBoard = testeBoard.replace(/['"]+/g, '');
                       boardArray = JSON.parse(responseSplit[0]);
                     }
                   }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}