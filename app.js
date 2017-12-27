window.onload = function(){

	var gameOfLife = function (p) {

		var columns;
		var rows;

		var board = [];
		var next  = [];
		var inImportation = [];

		var w = 10;
		var canvasSideLength = 400;

		var pause = false;


		p.mousePressed = function() {
		  if(p.mouseX >= 0 && p.mouseX < canvasSideLength && p.mouseY >= 0 && p.mouseY < canvasSideLength) {
		    let x = Math.floor(p.mouseX / w);
		  	let y = Math.floor(p.mouseY / w);

		    let numberPosition = positionToNumber(x, y);

		    alert(x + ":" + y + " = " + board[numberPosition] + " nei: " + getNeighborNumber(x, y));
		  }

		}

		p.setup = function() {
		  p.createCanvas(canvasSideLength, canvasSideLength);

		  columns = Math.floor(canvasSideLength / w);
		  rows    = Math.floor(canvasSideLength / w);

		  p.init();

		}

		p.generateTileMap = function() {
			for(var i = 0; i < columns * rows; i++) {
				board[i] = Math.floor((Math.random() * 2) + 1) - 1;
				next[i]  = 0;
			}
		}

		p.clearTileMap = function() {
			for(var i = 0; i < columns * rows; i++) {
				board[i] = 0;
				next[i]  = 0;
			}
		}

		p.init = function() {

		  p.generateTileMap();

		}

		p.draw = function() {
		  if(!pause) {
		    p.background(255);
		    p.generate();

		    for(var i = 0; i < board.length; i++) {

		      let out = p.numberToPosition(i);

		      let x = out[0];
		      let y = out[1];

		      if ((board[i] == 1)) {
		        p.stroke(0);
		        p.strokeWeight(0);
		        p.fill(p.color(0, 0, 0));
		        p.rect(x * w, y * w, w, w);
		      }
		    }

		  }

		}


		// next generation calculation
		p.generate = function() {

			if(inImportation.length > 0) {

				for(var i = 0; i < columns * rows; i++) {
					board[i] = inImportation[i];
					next[i]  = 0;
				}

				inImportation = [];
			}


		  for(var i = 0; i < board.length; i++) {

		    let out = p.numberToPosition(i);

		    let x = out[0];
		    let y = out[1];

		    let neighbors = p.getNeighborNumber(x, y);

		    if ((board[i] == 1) && (neighbors <  2))
		      next[i] = 0; //loneliness
		    else if ((board[i] == 1) && (neighbors >  3))
		      next[i] = 0; //overpopulation
		    else if ((board[i] == 0) && (neighbors == 3))
		      next[i] = 1; //reproduction
		    else
		      next[i] = board[i];
		  }

		  var temp = board;
		  board = next;
		  next = temp;
		}

		p.import = function(imported) {
			inImportation = imported.slice();
		}

		p.export = function() {
			return board;
		}

		p.numberToPosition = function(number) {
		  let x = number % columns;
		  let y = Math.floor(number / rows);
		  return [x, y];
		}

		p.positionToNumber = function(x, y) {
		  return x + y * columns;
		}


		p.getNeighborNumber = function(x, y) {
		  var neighbors = 0;

		  for (var i = -1; i <= 1; i++) {
		    for (var j = -1; j <= 1; j++) {

		      if((x + i) >= 0 && (y + j) >= 0 &&  (x + i) < rows &&  (y + j) < columns) {
		        let positionNeighbor = p.positionToNumber(x + i, y + j);
		        neighbors += board[positionNeighbor];
		      }

		    }
		  }

		  let position = p.positionToNumber(x, y);

		  if(board[position] == 1)
		    neighbors -= 1;

		  if(neighbors < 0 || isNaN(neighbors))
		    neighbors = 0;

		  return neighbors;
		}

		p.turnPause = function() {
			pause = !pause;
			p.updatePauseButton();
		}

		p.updatePauseButton = function() {
			if(pause == true)
				document.getElementById("turnPause").innerHTML = "Resume";
			else
				document.getElementById("turnPause").innerHTML = "Pause";
		}

	};



	var gameOfLifeEditor = function (p) {

		var columns;
		var rows;

		var board = [];
		var inImportation = [];

		var w = 10;
		var canvasSideLength = 400;

		p.mousePressed = function() {
		  if(p.mouseX >= 0 && p.mouseX < canvasSideLength && p.mouseY >= 0 && p.mouseY < canvasSideLength) {
		    let x = Math.floor(p.mouseX / w);
		  	let y = Math.floor(p.mouseY / w);

		    let numberPosition = p.positionToNumber(x, y);

				if(board[numberPosition] == 1)
					board[numberPosition] = 0;
				else
		    	board[numberPosition] = 1;
			}

		}

		p.generateTileMap = function() {
			for(var i = 0; i < columns * rows; i++) {
				board[i] = Math.floor((Math.random() * 2) + 1) - 1;
			}
		}

		p.setup = function() {
		  p.createCanvas(canvasSideLength, canvasSideLength);

		  columns = Math.floor(canvasSideLength / w);
		  rows    = Math.floor(canvasSideLength / w);

		  p.init();

		}

		p.clearTileMap = function() {
			for(var i = 0; i < columns * rows; i++) {
				board[i] = 0;
			}
		}

		p.init = function() {

		  p.clearTileMap();


		 	board[24] = 1;
		  board[62] = 1;
		  board[64] = 1;
		  board[92] = 1;
		  board[93] = 1;
		  board[100] = 1;
		  board[101] = 1;
		  board[114] = 1;
		  board[115] = 1;
		  board[131] = 1;
		  board[135] = 1;
		  board[140] = 1;
		  board[141] = 1;
		  board[154] = 1;
		  board[155] = 1;
		  board[160] = 1;
		  board[161] = 1;
		  board[170] = 1;
		  board[176] = 1;
		  board[180] = 1;
		  board[181] = 1;
		  board[200] = 1;
		  board[201] = 1;
		  board[210] = 1;
		  board[214] = 1;
		  board[216] = 1;
		  board[217] = 1;
		  board[222] = 1;
		  board[224] = 1;
		  board[250] = 1;
		  board[256] = 1;
		  board[264] = 1;
		  board[291] = 1;
		  board[295] = 1;
		  board[332] = 1;
		  board[333] = 1;

		}

		p.draw = function() {
	    p.background(255);

			if(inImportation.length > 0) {

				for(var i = 0; i < columns * rows; i++) {
					board[i] = inImportation[i];
				}

				inImportation = [];
			}

	    for(var i = 0; i < board.length; i++) {

	      let out = p.numberToPosition(i);

	      let x = out[0];
	      let y = out[1];

	      if ((board[i] == 1)) {
	        p.stroke(0);
	        p.strokeWeight(0);
	        p.fill(p.color(0, 0, 0));
	        p.rect(x * w, y * w, w, w);
	      }
	    }

		}

		p.import = function(importedMap) {
			inImportation = importedMap.slice();
		}

		p.export = function() {
			return board;
		}

		p.numberToPosition = function(number) {
		  let x = number % columns;
		  let y = Math.floor(number / rows);
		  return [x, y];
		}

		p.positionToNumber = function(x, y) {
		  return x + y * columns;
		}

	};




	var gameOfLifeElement = new p5(gameOfLife, 'gameOfLife-container');
	var gameOfLifeEditorElement = new p5(gameOfLifeEditor, 'gameOfLifeEditor-container');

	//game of life control
	document.getElementById("turnPause").addEventListener("click", function() {
		gameOfLifeElement.turnPause();
	});

	document.getElementById("clearTileMap").addEventListener("click", function() {
		gameOfLifeElement.clearTileMap();
	});

	document.getElementById("generateTileMap").addEventListener("click", function() {
		gameOfLifeElement.generateTileMap();
	});


	//game of life editor
	document.getElementById("clearEditorTileMap").addEventListener("click", function() {
		gameOfLifeEditorElement.clearTileMap();
	});

	// export to game of life
	document.getElementById("exportEditorTileMap").addEventListener("click", function() {
		gameOfLifeElement.import(gameOfLifeEditorElement.export());
	});

	//import into editor
	document.getElementById("importEditorTileMap").addEventListener("click", function() {
		var exportedTileMap = gameOfLifeElement.export();
		gameOfLifeEditorElement.import(exportedTileMap);
	});

	document.getElementById("generateEditorTileMap").addEventListener("click", function() {
		gameOfLifeEditorElement.generateTileMap();
	});


};
