import CanvasLayer from "./CanvasLayer";

export default class CanvasImageLayer extends CanvasLayer {
    constructor(imageRef, x, y, width, height) {
        super("image", x, y);
        this.imageRef = imageRef;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        if (this.width && this.height) {
            context.drawImage(this.imageRef, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(this.imageRef, this.x, this.y);
        }
    }
}
