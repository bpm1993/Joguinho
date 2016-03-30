var matrix;
var player;
var contTime = 0;
var rand = Math.floor((Math.random() * 10) + 1);
var rand2 = Math.floor((Math.random() * 10) + 1);
var arrayClouds = [];
var arrayBirds = [];
var aux = 0;
var height = 0;
var width = 0;
var points;
var bird;
var a=0;


function Cloud(){
	this.createElement = function(){
		var elm = document.createElement("img");
		document.getElementById("ambient").appendChild(elm);
		elm.classList.add("Clouds");
		elm.src = "textures/textures1.png";
		return elm;
	}
	
	this.posX = 1060;
	this.posY = Math.floor((Math.random() * 50) + 5);
	
	this.updatePos = function(){
		this.element.style.left = this.posX + "px";
	}
	
	this.setPosY = function(){
		this.element.style.top = this.posY + "px";
	}
	
	this.move = function(){
		this.posX -= this.speed;
		this.updatePos();
	}
	
	this.element = this.createElement();
	
	this.speed = Math.random() + 0.1;
	this.updatePos();
	this.setPosY();
	
}

function Bird(){
	this.createElement = function(){
		var elm = document.createElement("div");
		document.getElementById("ambient").appendChild(elm);
		elm.classList.add("Birds");
		return elm;
	}
	
	this.posX = 0;
	this.posY = Math.floor((Math.random() * 50) + 5);
	
	this.updatePos = function(){
		this.element.style.left = this.posX + "px";
		this.timeCont++;
		
		if(this.timeCont / 60 >= 2){
			this.timeCont = 0;
		}
	}
	
	
	this.setPosY = function(){
		this.element.style.top = this.posY + "px";
	}
	
	this.move = function(){
		this.posX += this.speed;
		this.updatePos();
	}
	
	this.element = this.createElement();
	this.wingsUp = true;
	this.timeCont = 0;
	this.speed = Math.random() + 0.1;
	this.updatePos();
	this.setPosY();
	
}

function moveAnimation(i, f, time){
	return i + time*(f-i);
}

function ResPlayer(){
	this.createElement = function(){
		var elm = document.createElement("div");
		document.getElementById("hud").appendChild(elm);
		elm.classList.add("res");
		elm.innerHTML = "Stamina: " + this.points;
		return elm;
	}
	
	this.updatePoints = function(res){
		this.points = res;
	
		this.element.innerHTML = "Stamina: " + this.points;
	}
	
	
	this.points = player.res;
	this.element = this.createElement();
}


//--------------------------------------------------------------------

function Points(){
	this.createElement = function(){
		var elm = document.createElement("div");
		document.getElementById("hud").appendChild(elm);
		elm.classList.add("points");
		elm.innerHTML = "Points: " + this.points;
		return elm;
	}
	
	this.updatePoints = function(block){
		this.points += block.value;
		this.element.innerHTML = "Points: " + this.	points;
	}
	
	this.points = 0;
	this.element = this.createElement();
}

//--------------------------------------------------------------------

function Player(imgSRC){
	this.createElement = function(){
		var elm = document.createElement("img");
		document.getElementById("blocks").appendChild(elm);
		elm.classList.add("player");
		elm.src = "textures/player1.png";
		return elm;
	}
	
	this.posX = 14;
	this.posY = -1;
	
	this.curY = -1;
	this.curX = 14;
	
	this.drawPlayer = function(){
		this.element.style.left = this.curX * 32 + "px";
		this.element.style.top = this.curY * 32 + "px";
	}
	this.updatePos = function(){
		this.curX = moveAnimation(this.curX, this.posX, 0.2);
		this.curY = moveAnimation(this.curY, this.posY, 0.2);
		
	}
	this.setSize = function(){
		this.element.style.width = 32 + "px";
		this.element.style.height = 32 + "px";
	}
	
	this.moveUp = function(moved){
		if(this.posY != -1){
			if(!moved){
				this.curY = this.posY-1;
			}
			else{
				this.curY = this.posY;
				this.posY--;
			
			}
		}
	}
	this.moveRight = function(moved){
		if(this.posX != width - 2){
			if(!moved){
				this.curX = this.posX+1;
			}
			else{
				this.curX = this.posX;
				this.posX++;
			}
		}
	}
	this.moveLeft = function(moved){
		if(this.posX != 1){
			if(!moved){
				this.curX = this.posX-1;
			}
			else{
				this.curX = this.posX;
				this.posX--;
			}
		}
	}
	this.moveDown = function(moved){
		if(this.posY != height - 2){
			if(!moved){
				this.curY = this.posY+1;
				
			}else{
				this.curY = this.posY;
				this.posY++;
			}
		}
	
	}
	
	this.upgradeStr = function(){
		
	}
	
	this.str = 1;
	this.res = 15;
	this.element = this.createElement();
	this.setSize();
	this.drawPlayer();
	this.updatePos();
	
	
}

//--------------------------------------------------------------------

function Block(imgSRC, type, row, column){
	this.createBackLayer = function(){
		var elm = document.createElement("img");
		elm.classList.add("blockBackLayer");
		elm.id = "backLayer" + row + column;
		if(type <= 2){
			elm.src = "textures/backLayer1.png";
		} else {
			elm.src = "textures/backLayer2.png";
		}
		document.getElementById("blocks").appendChild(elm);
		elm.style.zIndex = 0;
		
		return elm;
	}
	
	this.createElement = function(){
		var elm = document.createElement("img");
		elm.classList.add("block");
		elm.src = imgSRC;
		elm.id = "midLayer" + row + column;
		document.getElementById("blocks").appendChild(elm);
		elm.style.zIndex = 0;
		
		return elm;
	}
		
	this.createFrontLayer = function(){
		var elm = document.createElement("div");
		elm.classList.add("blockFrontLayer");
		elm.id = "frontLayer" + row + column;
		document.getElementById("blocks").appendChild(elm);
		if(type == 1){
			elm.style.zIndex = -1;
		} else {
			elm.style.zIndex = 1;
		}
		
		return elm;
	}
	
	this.updatePos = function(){
		this.element.style.left = column * 32 + "px";
		this.element.style.top = row * 32 + "px";
		this.backLayer.style.left = column * 32 + "px";
		this.backLayer.style.top = row * 32 + "px";
		this.frontLayer.style.left = column * 32 + "px";
		this.frontLayer.style.top = row * 32 + "px";
	}
	
	this.setSize = function(){
		this.element.style.width = 32 + "px";
		this.element.style.height = 32 + "px";
		this.frontLayer.style.width = 32 + "px";
		this.frontLayer.style.height = 32 + "px";
	}	
	
	this.changeVisibility = function(visible){
		if(type > 1){
			if(visible == false){
				this.visible = true;
				this.frontLayer.style.zIndex = -1;
			} else {
				this.visible = false;
				this.frontLayer.style.zIndex = 1;
			}
		}
	}
	
	this.addToMatrix = function(){
		matrix[row][column] = this;
	}
	
	this.destroy = function(){
		if(this.destroyed == false){
			this.type = 0;
			this.destroyed = true;
			document.getElementById("blocks").removeChild(this.element);
			document.getElementById("blocks").removeChild(this.frontLayer);
		}
	}
	
	this.defineAtt = function(){
		switch(type){
			case 3:
				this.res = 1;
				this.value = 0;
				break;
			case 4:
				this.res = 3;
				this.value = 3;
				break;
			case 5:
				this.res = 5;
				this.value = 10;
				break;
			default:
				this.res = 0;
				this.value = 0;
				break;
		}
		console.log(this.res);
	}
	
	this.reduceRes = function(){
		this.res -= player.str;
		console.log("Player str: " + player.str + ", Block : " + this.res);
	}
	
	this.destroyed = false;
	this.type = type;
	this.visible = false;
	this.pos = [row][column];
	this.backLayer = this.createBackLayer();
	this.element = this.createElement();
	this.frontLayer = this.createFrontLayer();
	this.res;
	this.value;
	
	this.setSize();
	this.updatePos();
	this.defineAtt();
	
}

//--------------------------------------------------------------------

function createArray(rows, columns) {
    var x = new Array(rows);
	for(var i = 0; i < rows; i++) {
  		x[i] = new Array(columns);
		for(var i2 = 0; i2 < columns; i2++){
			var imgSRC;
			var type;
			var rand = Math.floor((Math.random() * 10) + 1);
			if(i == 0){
				imgSRC = "textures/textures2.png";
				type = 1;
			} else if(i > 0 && i < 3){
				if(rand != 10){
					imgSRC = "textures/textures3.png";
					type = 2;
				} else {
					imgSRC = "textures/textures6.png";
					type = 4;
				}
			} else {
				if(rand <= 3){
					imgSRC = "textures/textures6.png";
					type = 4;
				} else if(rand == 10){
					type = 5;
					imgSRC = "textures/textures5.png";
				} else {
					type = 3;
					imgSRC = "textures/textures4.png";
				}
			}
			if(i == height - 1 || i2 == width -1 || i2 == 0){
				imgSRC = "textures/textures7.png";
				type = 6;
			}
			x[i][i2] = new Block(imgSRC, type, i, i2);
		}
	}
	return x;
}

function printMatrix(rows){
	for(var i = 0; i < rows; i++){
		console.log(matrix[i]);
	}
}

function init(){
	width = 30;
	height = 20;
	matrix = createArray(height, width);
	player = new Player("textures/player1.png");
	points = new Points();
	stamina = new ResPlayer();
}

function updateVisibility(){
	for(var i = 0; i < 3; i++){
		for(var i2 = 0; i2 < 3; i2++){
			if(i2 + player.posX - 1 > -1 && i + player.posX - 1 > -1 && i2 + player.posY > -1 && i + player.posY - 1 > -1){
				matrix[i + player.posY - 1][i2 + player.posX - 1].changeVisibility(false);
			}
		}
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function move(e){		
	var keyCode = e.keyCode;
	//sleep(0);
	
	if(player.res >= 1){
		if(keyCode == 38){
			if(player.str >= matrix[player.posY -1][player.posX].res){
				player.moveUp(true);
				matrix[player.posY][player.posX].destroy();
			} else {
				player.moveUp(false);
				matrix[player.posY - 1][player.posX].reduceRes();
			}
		}
		else if (keyCode == 40){
			if(player.str >= matrix[player.posY + 1][player.posX].res){
				player.moveDown(true);
				matrix[player.posY][player.posX].destroy();
			} else {
				player.moveDown(false);
				matrix[player.posY + 1][player.posX].reduceRes();
			}
		}
		else if(keyCode == 37){
			if(player.str >= matrix[player.posY][player.posX - 1].res){
				player.moveLeft(true);
				matrix[player.posY][player.posX].destroy();
			} else {
				player.moveLeft(false);
				matrix[player.posY][player.posX - 1].reduceRes();
			}
		}
		else if(keyCode == 39){
			if(player.str >= matrix[player.posY][player.posX + 1].res){
				player.moveRight(true);
				matrix[player.posY][player.posX].destroy();
			} else {
				player.moveRight(false);
				matrix[player.posY][player.posX + 1].reduceRes();
			}
		}
		points.updatePoints(matrix[player.posY][player.posX]);
		player.res += matrix[player.posY][player.posX].value ;
		player.res--;
		console.log(player.res);
		stamina.updatePoints(player.res);
		aux = 0;
		updateVisibility();
	} else {
		console.log("Funcção Legal");
		endDay();
	}
}

function endDay(){
	//player = new Player("textures/player1.png");
	
}

function update(){
	contTime++;
	if(contTime / 60 == rand){
		rand = Math.floor((Math.random() * 10) + 1);
		arrayClouds.push(new Cloud());
	}
	
	if(contTime / 60 == rand2){
		rand2 = Math.floor((Math.random() * 10) + 1);
		arrayBirds.push(new Bird());
		bird = ambient.getElementsByClassName("Birds");
		contTime = 0;
		
	}
	
	if(arrayClouds[0] != null){
		for(var i = 0; i < arrayClouds.length; i++){
			arrayClouds[i].move();
		}
	}
	
	if(arrayBirds[0] != null){
		for(var i = 0; i < arrayBirds.length; i++){
			arrayBirds[i].move();
		}
	}
}

function gameLoop(){
	player.updatePos();
	player.drawPlayer();
    update();
	
	requestAnimationFrame(gameLoop);
}
function birdkabum(e){
	console.log(bird.length);
	for (var i = 0; i < bird.length; i++) {
    	bird[i].addEventListener("click", oi(i), false);
	}
}

function oi(i){
	console.log("ooio");
	ambient.removeChild(bird[i]);
}

init();

window.addEventListener("keyup", move);
ambient.addEventListener("click", birdkabum);


requestAnimationFrame(gameLoop);