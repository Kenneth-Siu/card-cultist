import ImageTransform from "../../../ImageTransform";
import CanvasImageLayer from "../../CanvasImageLayer";
import CanvasLayer from "../../CanvasLayer";

export default class EnemyHorrorLayer extends CanvasLayer {
    static horrorImage;

    constructor(horror) {
        super(0, 0);
        this.horror = horror;
    }

    draw(context, prevY) {
        if (!EnemyHorrorLayer.horrorImage) {
            return { y: 0, w: 0 };
        }
        if (this.horror >= 1) {
            new CanvasImageLayer(
                EnemyHorrorLayer.horrorImage,
                new ImageTransform({
                    x: 440,
                    y: 570,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.horror >= 2) {
            new CanvasImageLayer(
                EnemyHorrorLayer.horrorImage,
                new ImageTransform({
                    x: 486,
                    y: 558,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.horror >= 3) {
            new CanvasImageLayer(
                EnemyHorrorLayer.horrorImage,
                new ImageTransform({
                    x: 530,
                    y: 542,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.horror >= 4) {
            new CanvasImageLayer(
                EnemyHorrorLayer.horrorImage,
                new ImageTransform({
                    x: 572,
                    y: 520,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.horror >= 5) {
            new CanvasImageLayer(
                EnemyHorrorLayer.horrorImage,
                new ImageTransform({
                    x: 612,
                    y: 492,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        return { y: 0, w: 0 };
    }
}
