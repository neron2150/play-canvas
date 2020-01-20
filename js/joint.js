class Joint {
    constructor(firstRect, secondRect, jointFunction) {
        this.firstRect = firstRect;
        this.secondRect = secondRect;
        this.jointFunction = jointFunction;
    }

    move() {
        const {firstRect, secondRect, jointFunction} = this;
        const result = jointFunction(firstRect, secondRect)
        firstRect.point = result.point;
        firstRect.angle = result.angle;
        
    }
}