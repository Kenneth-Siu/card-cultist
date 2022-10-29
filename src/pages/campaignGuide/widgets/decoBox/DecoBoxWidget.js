import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import {
    DECO_BOX,
    PARAGRAPH_FONT_SIZE,
    PARAGRAPH_LINE_HEIGHT,
    HEADER_2_FONT_SIZE,
    TITLE_UNDERLINE,
} from "../../campaignGuideConstants";
import Widget from "../Widget";
import DecoBoxWidgetView from "./DecoBoxWidgetView";

export default class DecoBoxWidget extends Widget {
    static type = "Deco Box";

    constructor(widgetOrId, campaignGuide, type) {
        super(widgetOrId, type || DecoBoxWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;

        this.color = widget.color || (campaignGuide && campaignGuide.colorTheme) || "#000000";
        this.title = widget.title || "";
        this.subtitle = widget.subtitle || "";
        this.text = widget.text || "";
        this.topBracket = widget.topBracket || false;
        this.bottomBracket = widget.bottomBracket || false;
    }

    getView(page, campaign, setCampaign) {
        return (
            <DecoBoxWidgetView key={this.id} widget={this} page={page} campaign={campaign} setCampaign={setCampaign} />
        );
    }

    draw(context, baseX, baseY, isFirst, _campaignGuide, PAGE) {
        context.save();

        const x = baseX + this.xNudge;
        const y = baseY + (isFirst ? 0 : DECO_BOX.INTER_WIDGET_MARGIN) + this.yNudge;

        const transparentTitleBox = this.drawTitle(context, x, y, PAGE, true);
        const transparentSubtitleBox = this.drawSubtitle(context, x, transparentTitleBox.y, PAGE, true);
        const transparentTextBox = this.drawText(context, x, transparentSubtitleBox.y, PAGE, true);

        const endY = transparentTextBox.y;

        const backgroundBox = this.drawBackground(context, x, y, endY, PAGE);
        this.drawTopBracket(context, x, y, PAGE);
        this.drawBottomBracket(context, x, backgroundBox.y, PAGE);
        const titleBox = this.drawTitle(context, x, y, PAGE);
        const subtitleBox = this.drawSubtitle(context, x, titleBox.y, PAGE);
        this.drawTitleUnderline(context, x, subtitleBox.y, subtitleBox.w || titleBox.w, PAGE);
        this.drawText(context, x, subtitleBox.y, PAGE);

        return backgroundBox;
    }

    drawBackground(context, x, y, contentEndY, PAGE) {
        context.save();

        const boxW = PAGE.COLUMN_WIDTH;
        const boxH = contentEndY + DECO_BOX.PADDING - y;
        context.shadowColor = this.color;
        context.shadowBlur = DECO_BOX.BLUR_DISTANCE;
        context.fillStyle = `rgba(0, 0, 0, ${DECO_BOX.BACKGROUND_ALPHA})`;
        context.shadowOffsetX = x + boxW;
        context.shadowOffsetY = y + boxH;

        context.fillRect(-boxW, -boxH, boxW, boxH);

        context.restore();

        return { y: y + boxH, w: boxW };
    }

    drawTopBracket(context, x, y, PAGE) {
        if (!this.topBracket) {
            return;
        }

        context.fillStyle = this.color;
        context.fillRect(
            x + DECO_BOX.BRACKET.LEFT,
            y,
            PAGE.COLUMN_WIDTH - DECO_BOX.BRACKET.LEFT - DECO_BOX.BRACKET.RIGHT,
            DECO_BOX.BRACKET.THICKNESS
        );

        const fleurLayerTopLeft = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("c")
                .withX(x + DECO_BOX.FLEUR.LEFT)
                .withY(y + DECO_BOX.FLEUR.SIZE + DECO_BOX.FLEUR.TOP)
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.FLEUR.LEFT - DECO_BOX.FLEUR.RIGHT)
                .withFontSize(DECO_BOX.FLEUR.SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.LEFT)
                .withColor(this.color)
        );

        fleurLayerTopLeft.draw(context);

        const fleurLayerTopRight = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("d")
                .withX(x + DECO_BOX.FLEUR.LEFT)
                .withY(y + DECO_BOX.FLEUR.SIZE + DECO_BOX.FLEUR.TOP)
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.FLEUR.LEFT - DECO_BOX.FLEUR.RIGHT)
                .withFontSize(DECO_BOX.FLEUR.SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.RIGHT)
                .withColor(this.color)
        );

        fleurLayerTopRight.draw(context);

        context.restore();
    }

    drawBottomBracket(context, x, y, PAGE) {
        if (!this.bottomBracket) {
            return;
        }

        context.fillStyle = this.color;
        context.fillRect(
            x + DECO_BOX.BRACKET.LEFT,
            y,
            PAGE.COLUMN_WIDTH - DECO_BOX.BRACKET.LEFT - DECO_BOX.BRACKET.RIGHT,
            DECO_BOX.BRACKET.THICKNESS
        );

        const fleurLayerTopLeft = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("a")
                .withX(x + DECO_BOX.FLEUR.LEFT)
                .withY(y - DECO_BOX.FLEUR.BOTTOM)
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.FLEUR.LEFT - DECO_BOX.FLEUR.RIGHT)
                .withFontSize(DECO_BOX.FLEUR.SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.LEFT)
                .withColor(this.color)
        );

        fleurLayerTopLeft.draw(context);

        const fleurLayerTopRight = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("b")
                .withX(x + DECO_BOX.FLEUR.LEFT)
                .withY(y - DECO_BOX.FLEUR.BOTTOM)
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.FLEUR.LEFT - DECO_BOX.FLEUR.RIGHT)
                .withFontSize(DECO_BOX.FLEUR.SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.RIGHT)
                .withColor(this.color)
        );

        fleurLayerTopRight.draw(context);

        context.restore();
    }

    drawTitle(context, x, y, PAGE, isTransparent) {
        if (!this.title) {
            return { y, w: 0 };
        }

        const titleLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.title)
                .withX(x + DECO_BOX.PADDING)
                .withY(y + DECO_BOX.PADDING + Math.round(HEADER_2_FONT_SIZE / 2))
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.PADDING * 2)
                .withFontSize(HEADER_2_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withAlign(TEXTALIGN.CENTER)
                .withColor(isTransparent ? "transparent" : this.color)
        );

        return titleLayer.draw(context);
    }

    drawSubtitle(context, x, y, PAGE, isTransparent) {
        if (!this.subtitle) {
            return { y, w: 0 };
        }

        const subtitleLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.subtitle)
                .withX(x + DECO_BOX.PADDING)
                .withY(
                    y +
                        Math.round(DECO_BOX.SUBTITLE.FONT_SIZE / 2) +
                        DECO_BOX.SUBTITLE.TOP +
                        (this.title ? DECO_BOX.SUBTITLE.INTER_TITLE_MARGIN : DECO_BOX.PADDING)
                )
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.PADDING * 2)
                .withFontSize(DECO_BOX.SUBTITLE.FONT_SIZE)
                .withFontFamily("Teutonic")
                .withAlign(TEXTALIGN.CENTER)
                .withColor(isTransparent ? "transparent" : this.color)
        );

        return subtitleLayer.draw(context);
    }

    drawTitleUnderline(context, x, y, w, PAGE) {
        if (!this.title && !this.subtitle) {
            return;
        }

        context.save();

        context.fillStyle = this.color;
        context.fillRect(x + PAGE.COLUMN_WIDTH / 2 - w / 2, y + TITLE_UNDERLINE.OFFSET, w, TITLE_UNDERLINE.THICKNESS);
        context.fillRect(
            x + PAGE.COLUMN_WIDTH / 2 - w / 2,
            y + TITLE_UNDERLINE.SECOND_OFFSET,
            w,
            TITLE_UNDERLINE.THICKNESS
        );

        context.restore();
    }

    drawText(context, x, y, PAGE, inTransparent) {
        const textLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + DECO_BOX.PADDING)
                .withY(
                    y +
                        Math.round(PARAGRAPH_FONT_SIZE / 2) +
                        (this.title || this.subtitle ? DECO_BOX.PARAGRAPH_INTER_MARGIN : DECO_BOX.PADDING)
                )
                .withWidth(PAGE.COLUMN_WIDTH - DECO_BOX.PADDING * 2)
                .withFontSize(PARAGRAPH_FONT_SIZE)
                .withLineHeight(PARAGRAPH_LINE_HEIGHT)
                .withColor(inTransparent ? "transparent" : "black")
                .withHighlightColor(this.color)
        );

        return textLayer.draw(context);
    }
}
