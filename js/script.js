

function onMouseMove(e) {
	this.mouseX = e.clientX;
	this.mouseY = e.clientY;
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
		{x: 0, y: 0, size: 50, color: 'GREEN'},
		{x: 0, y: 0, size: 50, color: 'GREEN'},
		{x: 0, y: 0, size: 50, color: 'GREEN'},
		{x: 0, y: 0, size: 50, color: 'GREEN'},
	]
	this.mouseX = 0;
	this.mouseY = 0;
	document.body.onmousemove = onMouseMove.bind(this)
	flip();
}
function flip() {
	if(this.currentScreen) {
		this.canvas1.style = 'display: none';
		this.canvas2.style = 'display: block';
		this.currentScreen = 0
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
	this.scene.fillRect(x, y, size, size);
}

function render() {
	this.rects.forEach(
		rect => drawRect(rect.x, rect.y, rect.size, rect.color)
	)
}
function gameStep() {
	rects[0].x = mouseX;
	rects[0].y = mouseY;

	rects[1].x = 700;
	rects[1].y = 400;
	const point = calcVector({
		x1: 700,
		y1: 400,
		x2: mouseX, 
		y2: mouseY,
		dist: 100
	});
	rects[2].x = point.x;
	rects[2].y = point.y;

}
function calcVector({x1, y1, x2, y2, dist}) {
	const point = {x: x1, y: y1};
	const angle = calcAngle({x1, y1, x2, y2})
	point.x = x1 + Math.sin(-angle * (Math.PI / 180) +90) * dist;
	//point.y = y1 + Math.cos(-angle / (Math.PI*18) +90) * dist;

	console.log(angle, point)
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




