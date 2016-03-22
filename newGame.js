var line0 = [];
var line1 = [];
var line2 = [];
var line3 = [];
var line4 = [];
var line5 = [];
var line6 = [];
var line7 = [];
var line8 = [];
var line9 = [];

var matrix;
var player;
var globalCont = 0;



function Player(imgSRC){
	var self = this;
	
	this.createElement = function(){
		var elm = document.createElement("img");
		document.getElementById("player").appendChild(elm);
		elm.classList.add("player");
		elm.src = "textures/blobRight.png";
		return elm;
	}
	
	this.posX = 6;
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
		this.posY--;
	}
	this.moveRight = function(){
		this.posX++;
	}
	this.moveLeft = function(){
		this.posX--;
	}
	this.moveDown = function(){
		this.posY++;
	}
	
	this.element = this.createElement();
	this.setSize();
	this.updatePos();	
	
}

//--------------------------------------------------------------------

function Block(imgSRC, layer){
	this.createElement = function(){
		var elm = document.createElement("img");
		elm.classList.add("block");
		elm.src = imgSRC;
		document.getElementById("blocks").appendChild(elm);
		return elm;
	}
	
	this.updatePos = function(){
		this.element.style.left = globalCont * 32 + "px";
		this.element.style.top = layer * 32 + "px";
	}
	
	this.setSize = function(){
		this.element.style.width = 32 + "px";
		this.element.style.height = 32 + "px";
	}
	
	this.addToVector = function(){
		
	}
	
	this.type = 0;
	this.visible = false;
	this.pos = [layer][line0.length];
	this.element = this.createElement();
	this.setSize();
	this.updatePos();
	this.addToVector();
}

//--------------------------------------------------------------------

function createArray(rows, columns) {
    var x = new Array(rows);
	for(var i = 0; i < rows; i++) {
  		x[i] = new Array(columns);
		for(var i2 = 0; i2 < columns; i2++){
			x[i][i2] = 0;
		}
	}
	return x;
}

function printMatrix(rows){
	for(var i = 0; i < rows; i++){
		console.log(matrix[i]);
	}
}

function createLayer(imgSRC, vector){
	for(var cont = 0; cont < 30; cont++){
		globalCont++;	
		if(globalCont == 30){
			globalCont = 0;
		}
		var block = new Block(imgSRC, vector);
		
	}
}

function createFloor(){
	for(var cont = 0; cont < 10; cont++){
		if(cont == 0){
			createLayer("textures/textures2.png", cont)
		} else if(cont > 0 && cont < 3){
			createLayer("textures/textures3.png", cont)
		} else {
			createLayer("textures/textures4.png", cont)
		}
	}
}


function init(){
	
	matrix = createArray(10, 20);

	createFloor();

	printMatrix(10);
	player = new Player("textures/blobRight.png");
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
}

init();

window.addEventListener("keydown", move);

