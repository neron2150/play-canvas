class View {
	constructor () {
		this.canvas1 = document.getElementById('canvas1');
		this.canvas2 = document.getElementById('canvas2');
		this.canvas1.height = window.innerHeight;
		this.canvas1.width = window.innerWidth;
		this.canvas2.height = window.innerHeight;
		this.canvas2.width = window.innerWidth;
	
		this.scene1 = canvas1.getContext('2d');
		this.scene2 = canvas2.getContext('2d');
	
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
		
	
		this.scene = this.scene1;
		this.canvas1.style = 'display: none';
		this.canvas2.style = 'display: block';
		this.currentScreen = 0;
		
		this.spriteSheets = {
			spaceship1: document.getElementById('spaceship1'),
			guns1: document.getElementById('guns1'),
		}
		this.sprites = {
			spaceship1: new Sprite({
				img: this.spriteSheets.spaceship1, 
				sx: 0, 
				sy: 0, 
				sWidth: this.spriteSheets.spaceship1.width, 
				sHeight: this.spriteSheets.spaceship1.height}),
			gun1: new Sprite({
				img: this.spriteSheets.guns1, 
				sx: 409.6 * 4, 
				sy: 409.6 *  0, 
				sWidth: 410, 
				sHeight: 410}),
			gun2: new Sprite({
				img: this.spriteSheets.guns1, 
				sx: 409.6 * 1, 
				sy: 409.6 *  2, 
				sWidth: 410, 
				sHeight: 410}),
			gun3: new Sprite({
				img: this.spriteSheets.guns1, 
				sx: 409.6 * 1, 
				sy: 409.6 *  0, 
				sWidth: 410, 
				sHeight: 410})
		}
		this.rects = [];
	}
	flip() {
		if(this.currentScreen) {
			this.canvas1.style = 'display: none';
			this.canvas2.style = 'display: block';
			this.currentScreen = 0;
			this.scene = this.scene1;
		} else {
			this.canvas2.style = 'display: none';
			this.canvas1.style = 'display: block';
			this.currentScreen = 1;
			this.scene = this.scene2;
		}
		this.clear();	
	}
	
	clear() {
		this.scene.fillStyle = this.colors['WHITE'];
		this.scene.fillRect(0, 0, window.innerWidth,  window.innerHeight);
	}
	
	drawRect(x, y, size, color, angle) {
		this.scene.translate(x, y)
		this.scene.rotate(angle * Math.PI / 180)
		
		this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
		this.scene.fillRect(-size/2, -size/2, size, size);
		// Reset current transformation matrix to the identity matrix
		this.scene.resetTransform();
	}

	drawLine(x1, y1, x2, y2, color = 'BLACK') {
		this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
		this.scene.beginPath();       // Начинает новый путь
		this.scene.moveTo(x1, y1);    // Рередвигает перо в точку (30, 50)
		this.scene.lineTo(x2, y2);  // Рисует линию до точки (150, 100)
		this.scene.stroke();   
	}

	drawSprite(rect) {
		const {point, dWidth, dHeight, sprite, angle, color} = rect;
		const {img, sx, sy, sWidth, sHeight} = sprite || {};
		this.scene.translate(point.x, point.y)
		this.scene.rotate((angle+ 90) * Math.PI / 180 )
		if (sprite) {
			this.scene.drawImage(img, sx, sy, sWidth, sHeight, -dWidth/2, -dHeight/2, dWidth, dHeight);
		}
		else {
			this.scene.fillStyle = this.colors[color] || `rgb(${color.red},${color.green},${color.blue})`;
			this.scene.fillRect(-dWidth/2, -dHeight/2, dWidth, dHeight);
		}
		this.scene.resetTransform();
	}
	
	render() {
		this.rects.forEach(
			rect => this.drawSprite(rect)
		)
		this.flip()
	}
}