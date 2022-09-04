import CanvasLayer from "./CanvasLayer";

export default class CanvasImageLayer extends CanvasLayer {
    constructor(imageRef, x, y) {
        super("image", x, y);
        this.imageRef = imageRef;
    }

    draw(context) {
        context.drawImage(this.imageRef, this.x, this.y);
    }
}
