import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { INTERLUDE_BOX, PARAGRAPH } from "../../campaignGuideConstants";
import Widget from "../Widget";
import InterludeBoxWidgetView from "./InterludeBoxWidgetView";

export default class InterludeBoxWidget extends Widget {
    static type = "Interlude Box";

    constructor(widgetOrId, campaignGuide, type) {
        super(widgetOrId, type || InterludeBoxWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;

        this.color = widget.color || (campaignGuide && campaignGuide.colorTheme) || "#000000";
        this.text = widget.text || "";
    }

    getView(page) {
        return <InterludeBoxWidgetView key={this.id} widget={this} page={page} />;
    }

    draw(context, baseX, baseY, isFirst, _campaignGuide, PAGE) {
        context.save();

        const x = baseX + this.xNudge;
        const y = baseY + (isFirst ? 0 : INTERLUDE_BOX.TOP_MARGIN) + this.yNudge;

        const transparentTextBox = this.drawText(context, x, y, PAGE, true);
        const endY = transparentTextBox.y;

        const backgroundBox = this.drawBackground(context, x, y, endY, PAGE);
        this.drawText(context, x, y, PAGE);

        backgroundBox.y += INTERLUDE_BOX.BOTTOM_MARGIN;

        this.drawBorder(context, x, y, endY, PAGE);


        return backgroundBox;
    }

    drawBackground(context, x, y, contentEndY, PAGE) {
        context.save();

        const boxW = PAGE.COLUMN_WIDTH;
        const boxH = contentEndY + INTERLUDE_BOX.PADDING - y;
        context.shadowColor = this.color;
        context.shadowBlur = INTERLUDE_BOX.BLUR_DISTANCE;
        context.fillStyle = `rgba(0, 0, 0, ${INTERLUDE_BOX.BACKGROUND_ALPHA})`;
        context.shadowOffsetX = x + boxW;
        context.shadowOffsetY = y + boxH;

        context.fillRect(-boxW, -boxH, boxW, boxH);

        context.restore();

        return { y: y + boxH, w: boxW };
    }

    drawBorder(context, x, y, contentEndY, PAGE) {
        context.save();

        context.strokeStyle = this.color;
        context.lineWidth = INTERLUDE_BOX.STROKE_WIDTH;
        context.beginPath();
        context.roundRect(x, y, PAGE.COLUMN_WIDTH, contentEndY + INTERLUDE_BOX.PADDING - y, INTERLUDE_BOX.CORNER_RADIUS);
        context.stroke();

        context.restore();
    }

    drawText(context, x, y, PAGE, inTransparent) {
        const textLayer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + INTERLUDE_BOX.PADDING)
                .withY(y + (this.title || this.subtitle ? INTERLUDE_BOX.PARAGRAPH_INTER_MARGIN : INTERLUDE_BOX.PADDING))
                .withWidth(PAGE.COLUMN_WIDTH - INTERLUDE_BOX.PADDING * 2)
                .withFontSize(PARAGRAPH.FONT_SIZE)
                .withLineHeight(PARAGRAPH.LINE_HEIGHT)
                .withColor(inTransparent ? "transparent" : "black")
                .withHighlightColor(this.color)
        );

        return textLayer.draw(context);
    }
}
