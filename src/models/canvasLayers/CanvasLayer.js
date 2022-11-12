export default class CanvasLayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.usePrevY = false;
    }

    draw(context) {
        throw "draw() not defined";
    }

    withPrevY() {
        this.usePrevY = true;
        return this;
    }
}
