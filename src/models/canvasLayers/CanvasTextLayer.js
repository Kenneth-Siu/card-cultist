import { CanvasTextWriter, writeText } from "../../helpers/canvasTextWriter/CanvasTextWriter2";
import CanvasLayer from "./CanvasLayer";

export default class CanvasTextLayer extends CanvasLayer {
    constructor(canvasTextConfig) {
        super("text", canvasTextConfig.x, canvasTextConfig.y);
        this.canvasTextConfig = canvasTextConfig;
    }

    draw(context) {
        return new CanvasTextWriter(context, this.canvasTextConfig).write();
    }
}
