import CanvasLayer from "./CanvasLayer";

export default class CanvasImageLayer extends CanvasLayer {
    constructor(imageRef, imageTransform, invertColors) {
        super("image", (imageTransform && imageTransform.x) || 0, (imageTransform && imageTransform.y) || 0);
        this.imageRef = imageRef;
        this.scale = (imageTransform && imageTransform.scale) || 1;
        this.rotation = (imageTransform && imageTransform.rotation) || 0;
        this.invertColors = invertColors || false;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);
        context.scale(this.scale, this.scale);
        context.filter = `invert(${this.invertColors ? 1 : 0})`;

        context.drawImage(this.imageRef, 0, 0);

        context.restore();

        // TODO y breaks for SVGs
        return { y: this.y + this.imageRef.height * this.scale, w: this.imageRef.width * this.scale };
    }
}
