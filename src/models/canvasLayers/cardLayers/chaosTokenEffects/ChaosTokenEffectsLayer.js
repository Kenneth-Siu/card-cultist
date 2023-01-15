import CanvasTextConfig, { TEXTALIGN } from "../../../CanvasTextConfig";
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
        const boxY = this.config.y + (this.usePrevY ? prevY : 0);

        const tokenEffectsStartY = this.config.text
            ? new CanvasTextLayer(
                  new CanvasTextConfig()
                      .withText(this.config.text)
                      .withAlign(TEXTALIGN.CENTER)
                      .withX(this.config.x)
                      .withY(boxY)
                      .withWidth(this.config.width)
                      .withItalic()
                      .withFontSize(this.config.fontSize)
                      .withLineHeight(this.config.lineHeight)
              ).draw(context).y
            : boxY;

        const numberOfSections =
            Math.min(1, this.skullText.length) +
            Math.min(1, this.cultistText.length) +
            Math.min(1, this.tabletText.length) +
            Math.min(1, this.elderThingText.length);

        if (numberOfSections === 0) {
            return { y: tokenEffectsStartY, w: 0 };
        }

        let currentY = tokenEffectsStartY;
        const TOKEN_WIDTH = 96;
        const GUTTER_WIDTH = 14;
        const textX = this.config.x + TOKEN_WIDTH + GUTTER_WIDTH;
        const textW = this.config.width - TOKEN_WIDTH - GUTTER_WIDTH;
        const height = this.config.height - (tokenEffectsStartY - boxY);

        const centerPoints = [
            [tokenEffectsStartY + height / 2],
            [tokenEffectsStartY + height / 3, tokenEffectsStartY + (2 * height) / 3],
            [
                tokenEffectsStartY + height / 7,
                tokenEffectsStartY + (3 * height) / 7,
                tokenEffectsStartY + (5 * height) / 7,
            ],
            [
                tokenEffectsStartY + height / 8,
                tokenEffectsStartY + (3 * height) / 8,
                tokenEffectsStartY + (5 * height) / 8,
                tokenEffectsStartY + (7 * height) / 8,
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
            new CanvasTextLayer(textConfig.withText(this.skullText).withY(currentY)).draw(context).y - currentY;

        const cultistHeight =
            this.cultistText &&
            new CanvasTextLayer(textConfig.withText(this.cultistText).withY(currentY)).draw(context).y - currentY;

        const tabletHeight =
            this.tabletText &&
            new CanvasTextLayer(textConfig.withText(this.tabletText).withY(currentY)).draw(context).y - currentY;

        const elderThingHeight =
            this.elderThingText &&
            new CanvasTextLayer(textConfig.withText(this.elderThingText).withY(currentY)).draw(context).y - currentY;

        textConfig.withColor("black");
        const centerPointsToUse = centerPoints[numberOfSections - 1];

        if (this.skullText && ChaosTokenEffectsLayer.skullTokenImage) {
            const center = centerPointsToUse.shift();
            new CanvasTextLayer(textConfig.withText(this.skullText).withY(Math.round(center - skullHeight / 2))).draw(
                context
            );
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
                textConfig.withText(this.cultistText).withY(Math.round(center - cultistHeight / 2))
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
            new CanvasTextLayer(textConfig.withText(this.tabletText).withY(Math.round(center - tabletHeight / 2))).draw(
                context
            );
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
                textConfig.withText(this.elderThingText).withY(Math.round(center - elderThingHeight / 2))
            ).draw(context);
            new CanvasImageLayer(
                ChaosTokenEffectsLayer.elderThingTokenImage,
                new ImageTransform()
                    .withX(this.config.x)
                    .withY(Math.round(center - TOKEN_WIDTH / 2))
                    .withScale(TOKEN_WIDTH / ChaosTokenEffectsLayer.elderThingTokenImage.width)
            ).draw(context);
        }

        return { y: tokenEffectsStartY + height, w: this.config.width };
    }
}
