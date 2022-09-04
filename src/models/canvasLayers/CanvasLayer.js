export default class CanvasLayer {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    draw(context) {
        throw "draw() not defined";
    }
}
