class Player {
    constructor() {
        const rect1 = new Rectangle(
            new Point(50,50), 
            100,
            100,
            view.sprites.spaceship1, 
            'GREEN', 
            0
        );	
        
        const rect2 = new Rectangle(
            new Point(150,50), 
            100,
            100,
            view.sprites.spaceship1, 
            'GREEN', 
            0
        );
        function jointFunc (rect1, rect2) {
            const angle = calcAngle(rect2.point, control.mousePos)
            const vec = calcVector(rect2.point, control.mousePos, 200, 0);
            const dif =  calcDif(rect1.point, vec);
            return {point: calcMotion(rect1.point, dif, 20), angle};
        }
        const joint = new Joint(rect1, rect2, jointFunc);
        this.joints = [];
        this.joints.push(joint);
        view.rects.push(rect1, rect2)
    }
}