import { writeText } from "../../helpers/canvasTextWriter";
import CanvasLayer from "./CanvasLayer";

export default class CanvasTextLayer extends CanvasLayer {
    constructor(canvasTextConfig) {
        super("text", canvasTextConfig.x, canvasTextConfig.y);
        this.canvasTextConfig = canvasTextConfig;
    }

    draw(context) {
        writeText(context, this.canvasTextConfig);
    }
}
