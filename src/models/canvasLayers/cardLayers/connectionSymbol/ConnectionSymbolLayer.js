import ImageTransform from "../../../ImageTransform";
import CanvasImageLayer from "../../CanvasImageLayer";
import CanvasLayer from "../../CanvasLayer";

export default class ConnectionSymbolLayer extends CanvasLayer {
    constructor(config) {
        super(config.x, config.y);
        this.config = config;
    }

    draw(context, prevY) {
        if (this.config.symbol.image) {
            const CIRCLE_RADIUS = 33.5;
            const ICON_WIDTH = 50;

            context.save();
            context.fillStyle = this.config.symbol.color;
            context.strokeStyle = "#120206";
            context.lineWidth = 2.5;
            context.shadowColor = "#120206";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 3;
            context.beginPath();
            context.arc(this.config.x + CIRCLE_RADIUS, this.config.y + CIRCLE_RADIUS, CIRCLE_RADIUS, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
            context.restore();

            new CanvasImageLayer(
                this.config.symbol.image,
                new ImageTransform({
                    x: this.config.x + CIRCLE_RADIUS - ICON_WIDTH / 2,
                    y: this.config.y + CIRCLE_RADIUS - ICON_WIDTH / 2,
                    scale: 1,
                })
            ).draw(context, prevY);

            return { y: this.config.y + 2 * CIRCLE_RADIUS, w: 2 * CIRCLE_RADIUS };
        }
        return { y: this.config.y, w: 0 };
    }
}
