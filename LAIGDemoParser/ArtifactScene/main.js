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

function playMenu() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<h1 id="Froglet">Froglet</h1>
					<script id="script" src="MyInterface.js"></script>
					<div id="optionsList">
						<div id="Human" onclick = "playDifficulty(0)"><p>Human vs Human</p></div>
						<div id="HumanAI" onclick = "playDifficulty(1)"><p>Human vs AI</p></div>
						<div id="AI" onclick = "playDifficulty(2)"><p>AI vs AI</p></div>
					</div>`;
}

function playDifficulty(gameType) {
  let body = document.getElementsByTagName('body')[0];
  if (gameType == 0) {
    this.play();
  } else if (gameType == 1) {
    body.innerHTML = `<h1 id="Froglet">Froglet</h1>
				<script id="script" src="MyInterface.js"></script>
				<div id="optionsList">
					<div id="Easy" onclick = "easyGame(1)"><p>Easy</p></div>
					<div id="Hard" onclick = "hardGame(1)"><p>Hard</p></div>
				</div>`;
  } else {
    body.innerHTML = `<h1 id="Froglet">Froglet</h1>
				<script id="script" src="MyInterface.js"></script>
				<div id="optionsList">
					<div id="Easy" onclick = "easyGame(2)"><p>Easy</p></div>
					<div id="Hard" onclick = "hardGame(2)"><p>Hard</p></div>
				</div>`;
  }
}

function easyGame(gameType) {
  this.play();
}

function hardGame(gameType) {
  this.play();
}