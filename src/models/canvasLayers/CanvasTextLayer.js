import { writeText } from "../../helpers/canvasTextWriter/canvasTextWriter";
import CanvasLayer from "./CanvasLayer";

export default class CanvasTextLayer extends CanvasLayer {
    constructor(canvasTextConfig, cardFace) {
        super("text", canvasTextConfig.x, canvasTextConfig.y);
        this.canvasTextConfig = canvasTextConfig;
        this.cardFace = cardFace;
    }

    draw(context) {
        return writeText(context, this.canvasTextConfig, this.cardFace);
    }
}
