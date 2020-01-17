
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
	

	this.canvas1.style = 'display: none';
	this.canvas2.style = 'display: block';
	this.currentScreen = 0;
	
	this.spriteSheets = {
		sprite_spaceship1: document.getElementById('sprite_spaceship1'),
		sprite_guns1: document.getElementById('guns1'),
	}
	this.sprites = {
		sprite_spaceship1: new Sprite({
			img: this.spriteSheets.sprite_spaceship1, 
			sx: 0, 
			sy: 0, 
			sWidth: this.spriteSheets.sprite_spaceship1.width, 
			sHeight: this.spriteSheets.sprite_spaceship1.height}),
		sprite_gun1: new Sprite({
			img: this.spriteSheets.sprite_guns1, 
			sx: 409.6 * 4, 
			sy: 409.6 *  0, 
			sWidth: 410, 
			sHeight: 410}),
		sprite_gun2: new Sprite({
			img: this.spriteSheets.sprite_guns1, 
			sx: 409.6 * 1, 
			sy: 409.6 *  2, 
			sWidth: 410, 
			sHeight: 410}),
		sprite_gun3: new Sprite({
			img: this.spriteSheets.sprite_guns1, 
			sx: 409.6 * 1, 
			sy: 409.6 *  0, 
			sWidth: 410, 
			sHeight: 410})
	}
	
	this.rects = [
		{x: 0, y: 0, size: 10, color: 'RED', angle: 0},
		{x: 300, y: 300, size: 150, color: 'GREEN', angle: 0, sprite: this.sprites.sprite_spaceship1},
		{x: 0, y: 0, size: 70, color: 'GREEN', angle: 0, sprite: this.sprites.sprite_gun1},
		{x: 0, y: 0, size: 70, color: 'GREEN', angle: 0, sprite: this.sprites.sprite_gun2},
		{x: 0, y: 0, size: 15, color: 'GREEN', angle: 0},
		{x: 0, y: 0, size: 15, color: 'GREEN', angle: 0},
	];
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

function drawRect(x, y, size, color, angle) {
	this.scene.translate(x, y)
	this.scene.rotate(angle * Math.PI / 180)
	
	this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
	this.scene.fillRect(-size/2, -size/2, size, size);
	// Reset current transformation matrix to the identity matrix
	this.scene.resetTransform();
	
}
function drawSprite(x, y, size, color, angle, sprite) {
	if (!sprite) return
	this.scene.translate(x, y)
	this.scene.rotate((angle+ 90) * Math.PI / 180 )
	

	this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
	const {img, sx, sy, sWidth, sHeight} = sprite;
	this.scene.drawImage(img, sx, sy, sWidth, sHeight, -size/2, -size/2, size, size);
	// Reset current transformation matrix to the identity matrix
	this.scene.resetTransform();
	
}
function render() {
	this.rects.forEach(
		rect => drawSprite(rect.x, rect.y, rect.size, rect.color, rect.angle, rect.sprite)
	)
	this.shoots.forEach(
		shoot => drawRect(shoot.rect.x, shoot.rect.y, shoot.rect.size, shoot.rect.color, shoot.rect.angle)
	)
	flip()
}