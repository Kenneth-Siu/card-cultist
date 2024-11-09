import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import { CONTENTS, PARAGRAPH } from "../../campaignGuideConstants";
import Widget from "../Widget";
import ContentsWidgetView from "./ContentsWidgetView";

export default class ContentsWidget extends Widget {
    static type = "Contents";

    constructor(widgetOrId) {
        super(widgetOrId, ContentsWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.sections = widget.sections || [];
        this.spacing = widget.spacing || 16;
    }

    getView(page) {
        return <ContentsWidgetView key={this.id} widget={this} page={page} />;
    }

    draw(context, x, y, _isFirst, _campaignGuide, PAGE) {
        if (this.sections.length === 0) {
            return { y, w: 0 };
        }
        context.save();

        let currentY = y;
        this.sections.forEach(section => {
            currentY = this.drawSection(context, x + CONTENTS.HORIZONTAL_MARGIN, currentY, section, PAGE).y + this.spacing;
        });

        context.restore();
        return {
            y: currentY,
            w: PAGE.COLUMN_WIDTH
        };
    }

    drawSection(context, x, y, section, PAGE) {
        const titleLayer = this.drawTitle(context, x, y, section.title);
        const pageNumberLayer = this.drawPageNumber(context, x, y, section.pageNumber, PAGE);
        this.drawDottedLine(
            context,
            x + titleLayer.w,
            y,
            PAGE.COLUMN_WIDTH - titleLayer.w - pageNumberLayer.w - 2 * CONTENTS.HORIZONTAL_MARGIN
        );
        return {
            y: titleLayer.y,
            w: PAGE.COLUMN_WIDTH
        };
    }

    drawTitle(context, x, y, text) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(text)
                .withX(x + this.xNudge)
                .withY(y + this.yNudge)
                .withFontSize(PARAGRAPH.FONT_SIZE)
                .withLineHeight(PARAGRAPH.LINE_HEIGHT)
        );
        return layer.draw(context);
    }

    drawPageNumber(context, x, y, pageNumber, PAGE) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(pageNumber + "")
                .withX(x + this.xNudge)
                .withY(y + this.yNudge)
                .withWidth(PAGE.COLUMN_WIDTH - 2 * CONTENTS.HORIZONTAL_MARGIN)
                .withFontSize(PARAGRAPH.FONT_SIZE)
                .withLineHeight(PARAGRAPH.LINE_HEIGHT)
                .withAlign(TEXTALIGN.RIGHT)
        );
        return layer.draw(context);
    }

    drawDottedLine(context, x, y, w) {
        context.save();

        context.lineWidth = 3;
        context.beginPath();
        context.setLineDash([3, 5]);
        context.moveTo(
            x + CONTENTS.DOTTED_LINE_HORIZONTAL_PADDING + this.xNudge,
            y + this.yNudge + CONTENTS.DOTTED_LINE_OFFSET
        );
        context.lineTo(
            x + w - CONTENTS.DOTTED_LINE_HORIZONTAL_PADDING + this.xNudge,
            y + this.yNudge + CONTENTS.DOTTED_LINE_OFFSET
        );
        context.stroke();

        context.restore();
    }
}