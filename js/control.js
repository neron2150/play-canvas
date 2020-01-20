class Control {
	constructor() {
		this.mousePos = new Point(0, 0);
		this.moveVec = {keyx: 0, keyy: 0, x: 0,y: 0}
		document.body.onmousemove = this.onMouseMove.bind(this);
		document.body.onmousedown = this.onMouseDown.bind(this);
		document.body.onkeydown = this.onKeyDown.bind(this);
		document.body.onkeyup = this.onKeyUp.bind(this);
		document.addEventListener('contextmenu', event => event.preventDefault());
	}

	onMouseMove(e) {
		this.mousePos.x = e.clientX;
		this.mousePos.y = e.clientY;
	}
	

	onMouseDown(e) {
		if(e.button === 0){shootLeft()}
		if(e.button === 2){shootRight()}
	}

	onKeyDown(e) {
		switch(e.code+ '') {
			case 'KeyW': this.moveVec.keyy = -1; break;
			case 'KeyS': this.moveVec.keyy = 1; break;
			case 'KeyA': this.moveVec.keyx = -1; break;
			case 'KeyD': this.moveVec.keyx = 1; break;
			default: return;
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

	onKeyUp(e) {
		switch(e.code+ '') {
			case 'KeyW': moveVec.keyy = 0; moveVec.y = 0; break;
			case 'KeyS': moveVec.keyy = 0; moveVec.y = 0; break;
			case 'KeyA': moveVec.keyx = 0; moveVec.x = 0; break;
			case 'KeyD': moveVec.keyx = 0; moveVec.x = 0; break;
			default: break;
		}
	}
}