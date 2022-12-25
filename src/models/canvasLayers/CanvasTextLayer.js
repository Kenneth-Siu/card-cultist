import { CanvasTextWriter } from "../../helpers/canvasTextWriter/CanvasTextWriter";
import { TEXTALIGN, UNDERLINE } from "../CanvasTextConfig";
import CanvasLayer from "./CanvasLayer";

export default class CanvasTextLayer extends CanvasLayer {
    constructor(canvasTextConfig) {
        super(canvasTextConfig.x, canvasTextConfig.y);
        this.canvasTextConfig = canvasTextConfig;
    }

    draw(context, prevY) {
        const startY = this.canvasTextConfig.y + (this.usePrevY ? prevY : 0);

        let { y, w } = new CanvasTextWriter(context, {
            ...Object.assign({}, this.canvasTextConfig),
            y: startY,
        }).write();

        const x =
            this.canvasTextConfig.align === TEXTALIGN.LEFT
                ? this.canvasTextConfig.x
                : this.canvasTextConfig.align === TEXTALIGN.CENTER
                ? this.canvasTextConfig.x + (this.canvasTextConfig.width - w) / 2
                : this.canvasTextConfig.x + this.canvasTextConfig.width - w;

        if (this.canvasTextConfig.underline !== UNDERLINE.NONE) {
            context.save();
            context.fillStyle = "black";

            y = Math.round(y - this.canvasTextConfig.fontSize / 9);
            context.fillRect(x, y, w, 1);

            if (this.canvasTextConfig.underline === UNDERLINE.DOUBLE) {
                y = Math.max(Math.round(y + this.canvasTextConfig.fontSize / 8), y + 2);
                context.fillRect(x, y, w, 1);
            }

            context.restore();
        }

        return { y, w };
    }
}
