

function onMouseMove(e) {
	this.mouseX = e.clientX;
	this.mouseY = e.clientY;
}

function onMouseDown(e) {
	if(e.button === 0){shootLeft()}
	if(e.button === 2){shootRight()}
}
function onKeyDown(e) {
	switch(e.code+ '') {
		case 'KeyW': this.moveVec.keyy = -1; break;
		case 'KeyS': this.moveVec.keyy = 1; break;
		case 'KeyA': this.moveVec.keyx = -1; break;
		case 'KeyD': this.moveVec.keyx = 1; break;
		default: break;
	}
	const vec = calcVector({
		x1: 0,
		y1: 0,
		x2: moveVec.keyx, 
		y2: moveVec.keyy,
		angle: 0,
		dist: 5
	});
	moveVec.x = vec.x;
	moveVec.y = vec.y
}
function onKeyUp(e) {
	switch(e.code+ '') {
		case 'KeyW': moveVec.keyy = 0;moveVec.y = 0; break;
		case 'KeyS': moveVec.keyy = 0;moveVec.y = 0; break;
		case 'KeyA': moveVec.keyx = 0;moveVec.x = 0; break;
		case 'KeyD': moveVec.keyx = 0;moveVec.x = 0; break;
		default: break;
	}
}
function init() {
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
	document.body.onmousemove = onMouseMove.bind(this)
	document.body.onmousedown = onMouseDown.bind(this)
	document.body.onkeydown = onKeyDown.bind(this)
	document.body.onkeyup = onKeyUp.bind(this)
	document.addEventListener('contextmenu', event => event.preventDefault());
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
}
function shootLeft() {
	const position = {
		x:this.rects[4].x,
		y:this.rects[4].y
	};
	const vec = calcVector({
		x1: position.x,
		y1: position.y,
		x2: mouseX, 
		y2: mouseY,
		angle: Math.random()*30-15,
		dist: 10
	});
	this.shoots.push({
		rect: {...position, size:5, color:'RED'},
		vec: {x:vec.x -position.x,y:vec.y -position.y}
	})
}
function shootRight() {
	const position = {
		x:this.rects[5].x,
		y:this.rects[5].y
	};
	const vec = calcVector({
		x1: position.x,
		y1: position.y,
		x2: mouseX, 
		y2: mouseY,
		angle: 0,
		dist: 5
	});
	this.shoots.push({
		rect: {...position, size:20, color:'BLUE'},
		vec: {x:vec.x -position.x,y:vec.y -position.y}
	})
}
function gameStep() {

	const point = calcVector({
		x1: rects[1].x,
		y1: rects[1].y,
		x2: mouseX, 
		y2: mouseY,
		angle: 90,
		dist: 70
	});
	const point1 = calcVector({
		x1: rects[1].x,
		y1: rects[1].y,
		x2: this.moveVec.x, 
		y2: this.moveVec.y,
		angle: 90,
		dist: 70
	});
	const point2 = calcVector({
		x1: rects[1].x,
		y1: rects[1].y,
		x2: mouseX, 
		y2: mouseY,
		angle: -90,
		dist: 70
	});
	const point3 = calcVector({
		x1: point.x,
		y1: point.y,
		x2: mouseX, 
		y2: mouseY,
		angle:0,
		dist: 50
	});
	const point4 = calcVector({
		x1: point2.x,
		y1: point2.y,
		x2: mouseX, 
		y2: mouseY,
		angle: 0,
		dist: 50
	});
	rects[2].x = point.x;
	rects[2].y = point.y;
	rects[3].x = point2.x;
	rects[3].y = point2.y;
	rects[4].x = point3.x;
	rects[4].y = point3.y;
	rects[5].x = point4.x;
	rects[5].y = point4.y;
	rects[0].x = mouseX;
	rects[0].y = mouseY;
	rects[1].x += moveVec.x;
	rects[1].y += moveVec.y;
	shoots.forEach(shoot => {
		shoot.rect.x += shoot.vec.x;
		shoot.rect.y += shoot.vec.y;

	})
}
function calcVector({x1, y1, x2, y2, angle, dist}) {
	const point = {x: x1, y: y1};
	const angle2 = calcAngle({x1, y1, x2, y2})
	point.x = x1 - Math.sin((270 - angle2 + angle) * Math.PI / 180) * dist;
	point.y = y1 - Math.cos((270 - angle2 + angle) * Math.PI / 180) * dist;
	return point;
}
function calcAngle({x1, y1, x2, y2}) {
	const dy = y1 - y2;
	const dx = x1 - x2;
	const theta = Math.atan2(dy, dx);
	return (theta * 180 / Math.PI)+180;
}
function loop() {
	setTimeout(()=> {
		render()
		flip();
		gameStep();
		loop();
	}, 3)
	
}

init();
loop();




