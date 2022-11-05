export default class CanvasLayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context) {
        throw "draw() not defined";
    }
}
