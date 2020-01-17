
function initView() {
	this.canvas1 = document.getElementById('canvas1');
	this.canvas2 = document.getElementById('canvas2');
	this.canvas1.height = window.innerHeight;
	this.canvas1.width = window.innerWidth;
	this.canvas2.height = window.innerHeight;
	this.canvas2.width = window.innerWidth;

	this.scene1 = canvas1.getContext('2d');
	this.scene2 = canvas2.getContext('2d');

	this.scene = scene1;
	this.scene1.height = window.innerHeight;
	this.scene1.width = window.innerWidth;
	this.scene2.height = window.innerHeight;
	this.scene2.width = window.innerWidth;
	this.colors = {
		GREEN: `rgb(0,255,0)`,
		RED: `rgb(255,0,0)`,
		BLUE: `rgb(0,0,255)`,
		WHITE: `rgb(255,255,255)`,
		BLACK: `rgb(0,0,0)`,
	};
	this.rects = [
		{x: 0, y: 0, size: 10, color: 'RED'},
		{x: 300, y: 300, size: 50, color: 'GREEN'},
		{x: 0, y: 0, size: 15, color: 'GREEN'},
		{x: 0, y: 0, size: 15, color: 'GREEN'},
		{x: 0, y: 0, size: 15, color: 'GREEN'},
		{x: 0, y: 0, size: 15, color: 'GREEN'},
	];
	this.shoots = [];
	this.mouseX = 0;
	this.mouseY = 0;
	this.moveVec = {keyx: 0, keyy: 0, x: 0,y: 0}

	flip();
}
function flip() {
	if(this.currentScreen) {
		this.canvas1.style = 'display: none';
		this.canvas2.style = 'display: block';
		this.currentScreen = 0;
		this.scene = scene1;
	} else {
		this.canvas2.style = 'display: none';
		this.canvas1.style = 'display: block';
		this.currentScreen = 1;
		this.scene = scene2;
	}
	clear();	
}

function clear() {
	this.scene.fillStyle = this.colors['WHITE'];
	this.scene.fillRect(0, 0, window.innerWidth,  window.innerHeight);
}

function drawRect(x, y, size, color) {

	this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
	this.scene.fillRect(x - size / 2, y -size / 2, size, size);
}

function render() {
	this.rects.forEach(
		rect => drawRect(rect.x, rect.y, rect.size, rect.color)
	)
	this.shoots.forEach(
		shoot => drawRect(shoot.rect.x, shoot.rect.y, shoot.rect.size, shoot.rect.color)
	)
	flip()
}