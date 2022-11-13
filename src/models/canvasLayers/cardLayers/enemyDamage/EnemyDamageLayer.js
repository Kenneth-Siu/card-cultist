import ImageTransform from "../../../ImageTransform";
import CanvasImageLayer from "../../CanvasImageLayer";
import CanvasLayer from "../../CanvasLayer";

export default class EnemyDamageLayer extends CanvasLayer {
    static damageImage;

    constructor(damage) {
        super(0, 0);
        this.damage = damage;
    }

    draw(context, prevY) {
        if (!EnemyDamageLayer.damageImage) {
            return { y: 0, w: 0 };
        }
        if (this.damage >= 1) {
            new CanvasImageLayer(
                EnemyDamageLayer.damageImage,
                new ImageTransform({
                    x: 262,
                    y: 570,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.damage >= 2) {
            new CanvasImageLayer(
                EnemyDamageLayer.damageImage,
                new ImageTransform({
                    x: 218,
                    y: 558,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.damage >= 3) {
            new CanvasImageLayer(
                EnemyDamageLayer.damageImage,
                new ImageTransform({
                    x: 174,
                    y: 542,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.damage >= 4) {
            new CanvasImageLayer(
                EnemyDamageLayer.damageImage,
                new ImageTransform({
                    x: 134,
                    y: 520,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        if (this.damage >= 5) {
            new CanvasImageLayer(
                EnemyDamageLayer.damageImage,
                new ImageTransform({
                    x: 96,
                    y: 492,
                    scale: 2,
                })
            ).draw(context, prevY);
        }
        return { y: 0, w: 0 };
    }
}
