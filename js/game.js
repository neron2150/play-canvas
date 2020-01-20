class Game {
	constructor() {
		this.shoots = [];
		this.player = new Player();
	}
	shootLeft() {
		const position = {
			x:this.rects[4].x,
			y:this.rects[4].y
		};
		const vec = calcVector({
			x1: position.x,
			y1: position.y,
			x2: mouseX, 
			y2: mouseY,
			angle: Math.random()*8-4,
			dist: 10
		});
		const angle = calcAngle({x1: position.x, y1: position.y, x2: mouseX, y2: mouseY});
		this.shoots.push({
			rect: {...position, size:5, color:'RED', angle },
			vec: {x:vec.x -position.x,y:vec.y -position.y}
		})
	}
	shootRight() {
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
		
		const angle = calcAngle({x1: position.x, y1: position.y, x2: mouseX, y2: mouseY});
		this.shoots.push({
			rect: {...position, size:20, color:'BLUE', angle},
			vec: {x:vec.x -position.x,y:vec.y -position.y}
		})
	}
	gameStep() {	
		this.player.joints.forEach(joint => joint.move());
	}
	
}