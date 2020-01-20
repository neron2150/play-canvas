
function calcVector(point1, point2, dist, angle) {
	const point = point1.clone();
	const angle2 = calcAngle(point1, point2)
	point.x = point1.x - Math.sin((270 - angle2 + angle) * Math.PI / 180) * dist;
	point.y = point1.y - Math.cos((270 - angle2 + angle) * Math.PI / 180) * dist;
	return point;
}

function calcAngle(point1, point2) {
	const dy = point1.y - point2.y;
	const dx = point1.x - point2.x;
	const theta = Math.atan2(dy, dx);
	return (theta * 180 / Math.PI)+180;
}
function calcDif(point1, point2) {
	return new Point(point1.x - point2.x, point1.y - point2.y);
}
function calcMotion(point1, point2, delay) {
	return new Point(point1.x - (point2.x / delay), point1.y - (point2.y / delay));
}
function loop(func, time) {
	setTimeout(()=> {
		func()
		loop(func, time);
	}, time)
	
}