function initGame() {
	this.shoots = [];
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
    const angle = calcAngle({x1: position.x, y1: position.y, x2: mouseX, y2: mouseY});
	this.shoots.push({
		rect: {...position, size:5, color:'RED', angle },
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
    
    const angle = calcAngle({x1: position.x, y1: position.y, x2: mouseX, y2: mouseY});
	this.shoots.push({
		rect: {...position, size:20, color:'BLUE', angle},
		vec: {x:vec.x -position.x,y:vec.y -position.y}
	})
}
function gameStep() {

	const point = calcVector({
		x1: rects[1].x,
		y1: rects[1].y,
		x2: mouseX, 
		y2: mouseY,
		angle: 120,
		dist: 55
	});

	const point2 = calcVector({
		x1: rects[1].x,
		y1: rects[1].y,
		x2: mouseX, 
		y2: mouseY,
		angle: -120,
		dist: 55
	});
	const point3 = calcVector({
		x1: point.x,
		y1: point.y,
		x2: mouseX, 
		y2: mouseY,
		angle:0,
		dist: 30
	});
	const point4 = calcVector({
		x1: point2.x,
		y1: point2.y,
		x2: mouseX, 
		y2: mouseY,
		angle: 0,
		dist: 30
	});
	rects[2].x = point.x;
    rects[2].y = point.y;
    rects[2].angle = calcAngle({x1: rects[2].x ,y1: rects[2].y ,x2: mouseX ,y2:mouseY});
	rects[3].x = point2.x;
    rects[3].y = point2.y;
    rects[3].angle = calcAngle({x1: rects[3].x, y1: rects[3].y, x2: mouseX, y2:mouseY});
	rects[4].x = point3.x;
    rects[4].y = point3.y;
    rects[4].angle = calcAngle({x1: rects[4].x, y1: rects[4].y, x2: mouseX, y2:mouseY});
	rects[5].x = point4.x;
    rects[5].y = point4.y;
    rects[5].angle = calcAngle({x1: rects[5].x, y1: rects[5].y, x2: mouseX, y2:mouseY});
	rects[0].x = mouseX;
	rects[0].y = mouseY;
    rects[0].angle = calcAngle({x1: rects[0].x, y1: rects[0].y, x2: mouseX, y2:mouseY});    
    rects[1].x += moveVec.x;
    rects[1].y += moveVec.y;
    rects[1].angle = calcAngle({x1: rects[1].x, y1: rects[1].y, x2: mouseX, y2:mouseY});
	shoots.forEach(shoot => {
		shoot.rect.x += shoot.vec.x;
		shoot.rect.y += shoot.vec.y;

	})
}
