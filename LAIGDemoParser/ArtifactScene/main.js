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

function play() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<script id="script" src="main.js"></script>`;
  //body.innerHTML +=  `<button onclick = "mainMenu()" onmouseout = "this.style.backgroundColor = 'rgb(48, 247, 48)'"; onmouseover = "this.style.backgroundColor = 'green'"; 
    //                style = "background-color: Transparent; cursor: pointer; background-color: rgb(48, 247, 48); float:left;"><b>Quit</b></button>`;

    this.insertBackButton();
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

           // start
           app.run();
         })
  ]);
}

function insertBackButton()
{
    let backButton = document.createElement("BUTTON");
    backButton.addEventListener("click", mainMenu);
    backButton.className = "backButton";
    backButton.innerHTML = "Quit Game";
    document.getElementById("script").insertAdjacentElement('beforebegin', backButton);
}


function mainMenu()
{
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
      console.log(JsonRequest);
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
}

function playMenu() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<br> <br> 
          <div> 
            <img src="scenes/images/froglet.png" alt="logo" /> 
          </div> <br> <br>
					<script id="script" src="MyInterface.js"> </script>
					<div id="optionsList">
						<div id="Human" onclick = "playDifficulty(0)"><button class = "button">Human vs Human</button></div> <br>
						<div id="HumanAI" onclick = "playDifficulty(1)"><button class = "button">Human vs AI</button></div> <br>
            <div id="AI" onclick = "playDifficulty(2)"><button class = "button">AI vs AI</button></div> <br>
            <div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>
					</div>`;
}

function playDifficulty(gameType) {
  let body = document.getElementsByTagName('body')[0];
  if (gameType == 0) {
    this.play();
  } else if (gameType == 1) {
    body.innerHTML = `<br> <br> 
    <div> 
    <img src="scenes/images/froglet.png" alt="logo" /> 
    </div>
    <br> <br>
				<script id="script" src="MyInterface.js"></script>
				<div id="optionsList">
					<div id="Easy" onclick = "easyGame(1)"><button class = "button">Easy</button></div> <br>
          <div id="Hard" onclick = "hardGame(1)"><button class = "button">Hard</button></div> <br>
          <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
				</div>`;
  } else {
    body.innerHTML = `<br> <br> 
    <div> 
    <img src="scenes/images/froglet.png" alt="logo" /> 
    </div>
        <br> <br>
				<script id="script" src="MyInterface.js"></script>
				<div id="optionsList">
					<div id="Easy" onclick = "easyGame(2)"><button class = "button">Easy</button></div> <br>
          <div id="Hard" onclick = "hardGame(2)"><button class = "button">Hard</button></div> <br>
          <div onclick = "playMenu()"><button class = "button">Go back</button></div> <br>
				</div>`;
  }
}

function easyGame(gameType) {
      let JsonRequest = "startBoard";
      console.log(JsonRequest);
      let requestPort = 8082;
      let request = new XMLHttpRequest();
      request.open('GET', 'http://127.0.0.1:8082' + '/' + JsonRequest, true);
      request.onload = (function (response) {     
          this.prologResponse = JSON.parse(response.target.response);
          if(this.prologResponse[0] === -1)
              return;
              var board = "[";
          for(var i = 0; i < this.prologResponse.length; i++)
          {
            if(!(i ==this.prologResponse.length - 1 ))
              board += "[" + this.prologResponse[i] + "],";
            else
              board += "[" + this.prologResponse[i] + "]";
          }
          board += "]";
          console.log(board);
          game(board);
      }).bind(this);
      //request.onerror = onError; TODO VER O QUE FAZER
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send();
}

function game(board)
{
  let JsonRequest = "firstMoveOK("+board+",1,1)";
  console.log(JsonRequest);
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open('GET', 'http://127.0.0.1:8082' + '/' + JsonRequest, true);
  request.onload = (function (response) {     
      this.prologResponse = JSON.parse(response.target.response);
      if(this.prologResponse[0] === -1)
          return;
      console.log(this.prologResponse);
  }).bind(this);
  //request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

function hardGame(gameType) {
  this.play();
}

function showCredits()
{
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = '<img src="scenes/images/credits.png" alt="credits">';
  body.innerHTML += '<div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>';
}