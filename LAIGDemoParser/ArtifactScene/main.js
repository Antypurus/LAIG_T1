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
    } else {
      var e = c[0][0];
      c.splice(0, 1);
      e.call();
    };
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

function play() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<script id="script" src="main.js"></script>
        <h1 id = "player1" style = "color: white; position: absolute; margin-left: 9em; margin-top:2em;">&#8680 `+ player1.name + `</h1>
        <h1 style = "color: white; position: absolute; margin-left: 15em;">`+ "Score" + `</h1>
        <h1 id = "player1score" style = "color: white; position: absolute; margin-left: 16em; margin-top:2em;">`+ player1.score + `</h1>
        <h1 id = "player2" style = "color: white; position: absolute; margin-left: 30em; margin-top:2em;">` + player2.name + `</h1>
        <h1 style = "color: white; position: absolute; margin-left: 26em;">`+ "Score" + `</h1>
        <h1 id = "player2score" style = "color: white; position: absolute; margin-left: 27em; margin-top:2em;">` + player2.score + `</h1>`;

  this.insertBackButton();

  serialInclude([
    '../lib/CGF.js',
    'XMLscene.js',
    'MySceneGraph.js',
    'MyGraphNode.js',
    'MyGraphLeaf.js',
    'MyInterface.js',
    'Position.js',
    'player.js',
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
    'GameEntities/GameBoard.js',
    'GameEntities/SquareHitBox.js',
    'GameEntities/GamePieceManager.js',
    'GameEntities/GamePiece.js',

    (main =
         function() {
           // Standard application, scene and interface setup
           var app = new CGFapplication(document.body);
           var myInterface = new MyInterface();
           var myScene = new XMLscene(myInterface);
           scene = myScene;
           scene.board = boardArray;
           scene.boardString = testeBoard;
           scene.player1 = player1;
           scene.player2 =  player2;
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

           var filename = getUrlVars()['file'] || 'final.xml';

           // create and load graph, and associate it to scene.
           // Check console for loading errors
           var myGraph = new MySceneGraph(filename, myScene);
           myGraph.board = testeBoard;

           // start
           app.run();
         })
  ]);
};

function player(name)
{
    this.score = 0;
    this.name = name;
}

function insertBackButton() {
  let backButton = document.createElement('BUTTON');
  backButton.addEventListener('click', mainMenu);
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

function playMenu() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
          <div> 
            <img src="scenes/images/froglet.png" alt="logo" /> 
          </div> <br> <br>
					<script id="script" src="MyInterface.js"> </script>
					<div id="optionsList">
						<div id="Human" onclick = "HumanHumanFirstPlayer()"><button class = "button">Human vs Human</button></div> <br>
						<div id="HumanAI" onclick = "HumanAiDifficulty()"><button class = "button">Human vs AI</button></div> <br>
            <div id="AI" onclick = "AiAiDifficulty()"><button class = "button">AI vs AI</button></div> <br>
            <div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>
					</div>`;
};

function HumanHumanFirstPlayer()
{
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

function HumanHumanGame(firstPlayer, secondPlayer)
{
  requestStartBoard();
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
				<div id="optionsList">
					<div id="Easy" onclick = "HumanAiFirstPlayer(1)"><button class = "button">Easy</button></div> <br>
          <div id="Hard" onclick = "HumanAiFirstPlayer(2)"><button class = "button">Hard</button></div> <br>
          <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
				</div>`;
};

function HumanAiFirstPlayer(difficulty)
{
  let body = document.getElementsByTagName('body')[0];
      body.innerHTML = `<br> <br> 
      <div> 
        <img src="scenes/images/froglet.png" alt="logo" /> 
      </div> <br> <br>
      <script id="script" src="MyInterface.js"> </script>
      <div id="optionsList">
        <h2 style = "color:green;"> Choose the first player </h2> <br>
        <div id="Player1" onclick = "humanAiGame('Human', 'CPU',` + difficulty + `)"><button class = "button">Human</button></div> <br>
        <div id="Player2" onclick = "humanAiGame('CPU', 'Human',` + difficulty + `)"><button class = "button">Computer</button></div> <br>
        <div onclick = "HumanAiDifficulty()"><button class = "button">Go back</button></div> <br>
      </div>`;
}

function humanAiGame(firstPlayer,secondPlayer,difficulty)
{
    requestStartBoard();
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

function AiAiFirstPlayer(difficulty)
{
  let body = document.getElementsByTagName('body')[0];
      body.innerHTML = `<br> <br> 
      <div> 
        <img src="scenes/images/froglet.png" alt="logo" /> 
      </div> <br> <br>
      <script id="script" src="MyInterface.js"> </script>
      <div id="optionsList">
        <h2 style = "color:green;"> Choose the first player </h2> <br>
        <div id="Player1" onclick = "AiAiGame('CPU 1', 'CPU 2',` + difficulty + `)"><button class = "button">Computer 1</button></div> <br>
        <div id="Player2" onclick = "AiAiGame('CPU 2','CPU 1',` + difficulty + `)"><button class = "button">Computer 2</button></div> <br>
        <div onclick = "AiAiDifficulty()"><button class = "button">Go back</button></div> <br>
      </div>`;
}

function AiAiGame(firstPlayer,secondPlayer,difficulty)
{
    requestStartBoard();
    player1 = new player(firstPlayer);
    player2 = new player(secondPlayer);
    gameType = 2;
    gameDifficulty = difficulty;
    this.play();
}

function firstMoveHuman(board,X,Y) 
{
  let JsonRequest = 'firstMoveOK(' + board +',' + X +',' + Y + ')';
  makeFirstMove(JsonRequest);
}

function moveHuman()
{
  if(scene.currentPlayer == scene.player1)
    scene.currentPlayer = scene.player2;
  else
  scene.currentPlayer = scene.player1;
}

function firstMoveCom(board, difficulty)
{
  if(difficulty == 1)
  {
    let JsonRequest = 'firstMoveCOMEasy(' + board +')';
    makeFirstMove(JsonRequest);
  }
  else if(difficulty == 2)
  {
    let JsonRequest = 'firstMoveCOMHard(' + board +')';
    makeFirstMove(JsonRequest);
  }
}

function MoveCom(board, difficulty)
{
  if(difficulty == 1)
  {
    let JsonRequest = 'moveCOMEasy(' + board +')';
    makeMove(JsonRequest);
  }
  else if(difficulty == 2)
  {
    let JsonRequest = 'moveCOMHard(' + board +')';
    makeMove(JsonRequest);
  }
}

function makeFirstMove(JsonRequest)
{
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) {
                     this.prologResponse = JSON.parse(response.target.response);
                     if (this.prologResponse[0] === -1) return;
                     if (this.prologResponse[0] == "no") scene.isFirstMove = true;
                     if (this.prologResponse[0] == "Syntax Error") scene.isFirstMove = true;
                     testeBoard = '[';
                     for (var i = 0; i < this.prologResponse.length; i++) {
                       if (!(i == this.prologResponse.length - 1))
                       testeBoard += '[' + this.prologResponse[i] + '],';
                       else
                       testeBoard += '[' + this.prologResponse[i] + ']';
                     }
                     testeBoard += ']';
                     boardArray = this.prologResponse;
                     scene.board = boardArray;
                     scene.boardString = testeBoard;
                     scene.isFirstMove = false;
                     if(scene.currentPlayer == scene.player1)
                     {
                        scene.currentPlayer = scene.player2;
                        document.getElementById("player1").innerHTML = scene.player1.name;
                        document.getElementById("player2").innerHTML = "&#8680" + scene.player2.name;
                     }
                     else
                     {
                       scene.currentPlayer = scene.player1;
                      document.getElementById("player1").innerHTML =  "&#8680" + scene.player1.name;
                      document.getElementById("player2").innerHTML = scene.player2.name;
                     }
                     
                   }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

function makeMove(JsonRequest)
{
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) {
                     this.prologResponse = JSON.parse(response.target.response.substr(0,response.target.response.indexOf("-")));

                     if (this.prologResponse[0] === -1) return;
                     else if (this.prologResponse[0] == "no") return;
                     else if (this.prologResponse[0] == "Syntax Error") return;
                     else 
                     {
                        testeBoard = '[';
                        for (var i = 0; i < this.prologResponse.length; i++) {
                          if (!(i == this.prologResponse.length - 1))
                          testeBoard += '[' + this.prologResponse[i] + '],';
                          else
                          testeBoard += '[' + this.prologResponse[i] + ']';
                        }
                        testeBoard += ']';
                        boardArray = this.prologResponse;
                        scene.board = boardArray;
                        scene.boardString = testeBoard;
                        if(scene.currentPlayer == scene.player1)
                        {
                            scene.currentPlayer = scene.player2;
                            document.getElementById("player1").innerHTML = scene.player1.name;
                            document.getElementById("player2").innerHTML = "&#8680" + scene.player2.name;
                            scene.player1.score += Number(response.target.response.substr(response.target.response.indexOf("-") + 1,1));
                            player1.score = scene.player1.score;
                            document.getElementById("player1score").innerHTML = scene.player1.score;
                        }
                        else
                        {
                            scene.currentPlayer = scene.player1;
                            document.getElementById("player1").innerHTML =  "&#8680" + scene.player1.name;
                            document.getElementById("player2").innerHTML = scene.player2.name;
                            scene.player2.score += Number(response.target.response.substr(response.target.response.indexOf("-") + 1,1));
                            player2.score = scene.player2.score;
                            document.getElementById("player2score").innerHTML = scene.player2.score;
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

function requestStartBoard()
{
  let JsonRequest = 'startBoard';
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) {
                     this.prologResponse = JSON.parse(response.target.response);
                     if (this.prologResponse[0] === -1) return;
                     testeBoard = '[';
                     for (var i = 0; i < this.prologResponse.length; i++) {
                       if (!(i == this.prologResponse.length - 1))
                       testeBoard += '[' + this.prologResponse[i] + '],';
                       else
                       testeBoard += '[' + this.prologResponse[i] + ']';
                     }
                     testeBoard += ']';
                     boardArray = this.prologResponse;
                   }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}