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

function loop(func, time) {
	setTimeout(()=> {
		func()
		loop(func, time);
	}, time)
	
}