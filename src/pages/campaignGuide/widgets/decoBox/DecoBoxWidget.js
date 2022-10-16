import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import {
    COLUMN_WIDTH,
    DECO_BOX_BLUR_DISTANCE,
    DECO_BOX_PADDING,
    DECO_BOX_SUBTITLE_FONT_SIZE,
    FLEUR_SIZE,
    PARAGRAPH_FONT_SIZE,
    PARAGRAPH_LINE_HEIGHT,
    SECTION_HEADER_FONT_SIZE,
} from "../../canvasConstants";
import Widget from "../Widget";
import DecoBoxWidgetView from "./DecoBoxWidgetView";

export default class DecoBoxWidget extends Widget {
    static type = "Deco Box";

    constructor(widgetOrId, campaignGuide) {
        super(widgetOrId, DecoBoxWidget.type);
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

    draw(context, baseX, baseY, isFirst) {
        context.save();

        const x = baseX + this.xNudge;
        const y = baseY + (isFirst ? 0 : 22) + this.yNudge;

        const transparentTitleBox = this.drawTitle(context, x, y, true);
        const transparentSubtitleBox = this.drawSubtitle(context, x, transparentTitleBox.y, true);
        const transparentTextBox = this.drawText(context, x, transparentSubtitleBox.y, true);

        const endY = transparentTextBox.y;

        const backgroundBox = this.drawBackground(context, x, y, endY);
        this.drawTopBracket(context, x, y);
        this.drawBottomBracket(context, x, backgroundBox.y);
        const titleBox = this.drawTitle(context, x, y);
        const subtitleBox = this.drawSubtitle(context, x, titleBox.y);
        this.drawTitleUnderline(context, x, subtitleBox.y, subtitleBox.w || titleBox.w);
        this.drawText(context, x, subtitleBox.y);

        return backgroundBox;
    }

    drawBackground(context, x, y, contentEndY) {
        context.save();

        const boxW = COLUMN_WIDTH;
        const boxH = contentEndY + DECO_BOX_PADDING - y;
        context.shadowColor = this.color;
        context.shadowBlur = DECO_BOX_BLUR_DISTANCE;
        context.fillStyle = "rgba(0, 0, 0, 0.175)";
        context.shadowOffsetX = x + boxW;
        context.shadowOffsetY = y + boxH;

        context.fillRect(-boxW, -boxH, boxW, boxH);

        context.restore();

        return { y: y + boxH, w: boxW };
    }

    drawTopBracket(context, x, y) {
        if (!this.topBracket) {
            return;
        }

        context.fillStyle = this.color;
        context.fillRect(x + 89, y, COLUMN_WIDTH - 179, 2);

        const fleurLayerTopLeft = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("c")
                .withX(x + 4)
                .withY(y + FLEUR_SIZE - 7)
                .withWidth(COLUMN_WIDTH - 9)
                .withFontSize(FLEUR_SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.LEFT)
                .withColor(this.color)
        );

        fleurLayerTopLeft.draw(context);

        const fleurLayerTopRight = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("d")
                .withX(x + 4)
                .withY(y + FLEUR_SIZE - 7)
                .withWidth(COLUMN_WIDTH - 9)
                .withFontSize(FLEUR_SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.RIGHT)
                .withColor(this.color)
        );

        fleurLayerTopRight.draw(context);

        context.restore();
    }

    drawBottomBracket(context, x, y) {
        if (!this.bottomBracket) {
            return;
        }

        context.fillStyle = this.color;
        context.fillRect(x + 89, y, COLUMN_WIDTH - 179, 2);

        const fleurLayerTopLeft = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("a")
                .withX(x + 4)
                .withY(y - 1)
                .withWidth(COLUMN_WIDTH - 9)
                .withFontSize(FLEUR_SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.LEFT)
                .withColor(this.color)
        );

        fleurLayerTopLeft.draw(context);

        const fleurLayerTopRight = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText("b")
                .withX(x + 4)
                .withY(y - 1)
                .withWidth(COLUMN_WIDTH - 9)
                .withFontSize(FLEUR_SIZE)
                .withFontFamily("AHCampaignFleurs")
                .withAlign(TEXTALIGN.RIGHT)
                .withColor(this.color)
        );

        fleurLayerTopRight.draw(context);

        context.restore();
    }

    drawTitle(context, x, y, inTransparent) {
        if (!this.title) {
            return { y, w: 0 };
        }

        const titleLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.title)
                .withX(x + DECO_BOX_PADDING)
                .withY(y + DECO_BOX_PADDING + 15)
                .withWidth(COLUMN_WIDTH - DECO_BOX_PADDING * 2)
                .withFontSize(SECTION_HEADER_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withAlign(TEXTALIGN.CENTER)
                .withColor(inTransparent ? "transparent" : this.color)
        );

        return titleLayer.draw(context);
    }

    drawSubtitle(context, x, y, inTransparent) {
        if (!this.subtitle) {
            return { y, w: 0 };
        }

        const subtitleLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.subtitle)
                .withX(x + DECO_BOX_PADDING)
                .withY(y + (this.title ? 29 : DECO_BOX_PADDING + 8))
                .withWidth(COLUMN_WIDTH - DECO_BOX_PADDING * 2)
                .withFontSize(DECO_BOX_SUBTITLE_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withAlign(TEXTALIGN.CENTER)
                .withColor(inTransparent ? "transparent" : this.color)
        );

        return subtitleLayer.draw(context);
    }

    drawTitleUnderline(context, x, y, w) {
        if (!this.title && !this.subtitle) {
            return;
        }

        context.save();

        context.fillStyle = this.color;
        context.fillRect(x + COLUMN_WIDTH / 2 - w / 2, y + 6, w, 1);
        context.fillRect(x + COLUMN_WIDTH / 2 - w / 2, y + 9, w, 1);

        context.restore();
    }

    drawText(context, x, y, inTransparent) {
        const textLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + DECO_BOX_PADDING)
                .withY(y + 10 + 30)
                .withWidth(COLUMN_WIDTH - DECO_BOX_PADDING * 2)
                .withFontSize(PARAGRAPH_FONT_SIZE)
                .withLineHeight(PARAGRAPH_LINE_HEIGHT)
                .withColor(inTransparent ? "transparent" : "black")
                .withHighlightColor(this.color)
        );

        return textLayer.draw(context);
    }
}
