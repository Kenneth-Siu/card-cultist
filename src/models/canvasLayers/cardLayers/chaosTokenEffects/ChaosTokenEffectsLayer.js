import CanvasTextConfig from "../../../CanvasTextConfig";
import ImageTransform from "../../../ImageTransform";
import CanvasImageLayer from "../../CanvasImageLayer";
import CanvasLayer from "../../CanvasLayer";
import CanvasTextLayer from "../../CanvasTextLayer";

// TODO Combine tokens

export default class ChaosTokenEffectsLayer extends CanvasLayer {
    static skullTokenImage;
    static cultistTokenImage;
    static tabletTokenImage;
    static elderThingTokenImage;

    constructor(config) {
        super(config.x, config.y);
        this.config = config;
        this.skullText = config.skullText;
        this.cultistText = config.cultistText;
        this.tabletText = config.tabletText;
        this.elderThingText = config.elderThingText;
    }

    draw(context, prevY) {
        const startY = this.config.y + (this.usePrevY ? prevY : 0);

        const numberOfSections =
            Math.min(1, this.skullText.length) +
            Math.min(1, this.cultistText.length) +
            Math.min(1, this.tabletText.length) +
            Math.min(1, this.elderThingText.length);

        if (numberOfSections === 0) {
            return { y: startY, w: 0 };
        }

        let currentY = startY;
        const TOKEN_WIDTH = 96;
        const GUTTER_WIDTH = 14;
        const ACTUAL_LINE_HEIGHT = 0.57 * this.config.lineHeight;
        const textX = this.config.x + TOKEN_WIDTH + GUTTER_WIDTH;
        const textW = this.config.width - TOKEN_WIDTH - GUTTER_WIDTH;

        const centerPoints = [
            [startY + this.config.height / 2],
            [startY + this.config.height / 3, startY + (2 * this.config.height) / 3],
            [
                startY + this.config.height / 7,
                startY + (3 * this.config.height) / 7,
                startY + (5 * this.config.height) / 7,
            ],
            [
                startY + this.config.height / 8,
                startY + (3 * this.config.height) / 8,
                startY + (5 * this.config.height) / 8,
                startY + (7 * this.config.height) / 8,
            ],
        ];

        const textConfig = new CanvasTextConfig()
            .withX(textX)
            .withWidth(textW)
            .withFontSize(this.config.fontSize)
            .withLineHeight(this.config.lineHeight)
            .withColor("transparent");

        const skullHeight =
            this.skullText &&
            new CanvasTextLayer(textConfig.withText(this.skullText).withY(currentY)).draw(context).y +
                this.config.fontSize * ACTUAL_LINE_HEIGHT -
                currentY;

        const cultistHeight =
            this.cultistText &&
            new CanvasTextLayer(textConfig.withText(this.cultistText).withY(currentY)).draw(context).y +
                this.config.fontSize * ACTUAL_LINE_HEIGHT -
                currentY;

        const tabletHeight =
            this.tabletText &&
            new CanvasTextLayer(textConfig.withText(this.tabletText).withY(currentY)).draw(context).y +
                this.config.fontSize * ACTUAL_LINE_HEIGHT -
                currentY;

        const elderThingHeight =
            this.elderThingText &&
            new CanvasTextLayer(textConfig.withText(this.elderThingText).withY(currentY)).draw(context).y +
                this.config.fontSize * ACTUAL_LINE_HEIGHT -
                currentY;

        textConfig.withColor("black");
        const centerPointsToUse = centerPoints[numberOfSections - 1];

        if (this.skullText && ChaosTokenEffectsLayer.skullTokenImage) {
            const center = centerPointsToUse.shift();
            new CanvasTextLayer(
                textConfig
                    .withText(this.skullText)
                    .withY(Math.round(center + this.config.fontSize * ACTUAL_LINE_HEIGHT - skullHeight / 2))
            ).draw(context);
            new CanvasImageLayer(
                ChaosTokenEffectsLayer.skullTokenImage,
                new ImageTransform()
                    .withX(this.config.x)
                    .withY(Math.round(center - TOKEN_WIDTH / 2))
                    .withScale(TOKEN_WIDTH / ChaosTokenEffectsLayer.skullTokenImage.width)
            ).draw(context);
        }
        if (this.cultistText && ChaosTokenEffectsLayer.cultistTokenImage) {
            const center = centerPointsToUse.shift();
            new CanvasTextLayer(
                textConfig
                    .withText(this.cultistText)
                    .withY(Math.round(center + this.config.fontSize * ACTUAL_LINE_HEIGHT - cultistHeight / 2))
            ).draw(context);
            new CanvasImageLayer(
                ChaosTokenEffectsLayer.cultistTokenImage,
                new ImageTransform()
                    .withX(this.config.x)
                    .withY(Math.round(center - TOKEN_WIDTH / 2))
                    .withScale(TOKEN_WIDTH / ChaosTokenEffectsLayer.cultistTokenImage.width)
            ).draw(context);
        }
        if (this.tabletText && ChaosTokenEffectsLayer.tabletTokenImage) {
            const center = centerPointsToUse.shift();
            new CanvasTextLayer(
                textConfig
                    .withText(this.tabletText)
                    .withY(Math.round(center + this.config.fontSize * ACTUAL_LINE_HEIGHT - tabletHeight / 2))
            ).draw(context);
            new CanvasImageLayer(
                ChaosTokenEffectsLayer.tabletTokenImage,
                new ImageTransform()
                    .withX(this.config.x)
                    .withY(Math.round(center - TOKEN_WIDTH / 2))
                    .withScale(TOKEN_WIDTH / ChaosTokenEffectsLayer.tabletTokenImage.width)
            ).draw(context);
        }
        if (this.elderThingText && ChaosTokenEffectsLayer.elderThingTokenImage) {
            const center = centerPointsToUse.shift();
            new CanvasTextLayer(
                textConfig
                    .withText(this.elderThingText)
                    .withY(
                        Math.round(center + this.config.fontSize * ACTUAL_LINE_HEIGHT - elderThingHeight / 2)
                    )
            ).draw(context);
            new CanvasImageLayer(
                ChaosTokenEffectsLayer.elderThingTokenImage,
                new ImageTransform()
                    .withX(this.config.x)
                    .withY(Math.round(center - TOKEN_WIDTH / 2))
                    .withScale(TOKEN_WIDTH / ChaosTokenEffectsLayer.elderThingTokenImage.width)
            ).draw(context);
        }

        return { y: startY + this.config.height, w: this.config.width };
    }
}
