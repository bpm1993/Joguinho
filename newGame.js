var matrix;
var player;
var contTime = 0;
var rand = Math.floor((Math.random() * 10) + 1);
var arrayClouds = [];

function Cloud(){
	this.createElement = function(){
		var elm = document.createElement("img");
		document.getElementById("clouds").appendChild(elm);
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

//--------------------------------------------------------------------

function Player(imgSRC){
	this.createElement = function(){
		var elm = document.createElement("img");
		document.getElementById("blocks").appendChild(elm);
		elm.classList.add("player");
		elm.src = "textures/blobRight.png";
		return elm;
	}
	
	this.posX = 14;
	this.posY = -1;
	
	this.updatePos = function(){
		this.element.style.left = this.posX * 32 + "px";
		this.element.style.top = this.posY * 32 + "px";
	}
	this.setSize = function(){
		this.element.style.width = 32 + "px";
		this.element.style.height = 32 + "px";
	}
	
	this.moveUp = function(){
		if(this.posY != -1){
			this.posY--;
		}
	}
	this.moveRight = function(){
		if(this.posX != 29){
			this.posX++;
		}
	}
	this.moveLeft = function(){
		if(this.posX != 0){
			this.posX--;
		}
	}
	this.moveDown = function(){
		this.posY++;
	}
	
	this.upgradeStr = function(){
		
	}
	
	this.str = 1;
	this.element = this.createElement();
	this.setSize();
	this.updatePos();
	
}

//--------------------------------------------------------------------

function Block(imgSRC, type, row, column){
	this.createElement = function(){
		var elm = document.createElement("img");
		elm.classList.add("block");
		elm.src = imgSRC;
		elm.id = "backLayer" + row + column;
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
	
	this.destroyed = false;
	this.type = type;
	this.visible = false;
	this.pos = [row][column];
	this.element = this.createElement();
	this.frontLayer = this.createFrontLayer();
	
	this.setSize();
	this.updatePos();
	
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
	matrix = createArray(25, 30);
	player = new Player("textures/blobRight.png");
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

function move(e){		
	var keyCode = e.keyCode;
	if(keyCode == 38){
		player.moveUp();
	}
	 else if (keyCode == 40){
		player.moveDown();
	}
	else if(keyCode == 37){
		player.moveLeft();
	}
	else if(keyCode == 39){
		player.moveRight();
	}
	player.updatePos();
	updateVisibility();
	matrix[player.posY][player.posX].destroy();
}

function update(){
	contTime++;
	if(contTime / 60 == rand){
		rand = Math.floor((Math.random() * 10) + 1);
		arrayClouds.push(new Cloud());
		contTime = 0;
	}
	
	if(arrayClouds[0] != null){
		for(var i = 0; i < arrayClouds.length; i++){
			arrayClouds[i].move();
		}
	}
}

function gameLoop(){
    update();
	requestAnimationFrame(gameLoop);
}

init();

window.addEventListener("keydown", move);
requestAnimationFrame(gameLoop);