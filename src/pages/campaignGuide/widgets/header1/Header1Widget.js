import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import {
    HEADER_1_FONT_SIZE,
    HEADER_1_START_TOP,
    TITLE_UNDERLINE,
    HEADER_1_BOTTOM_MARGIN,
} from "../../campaignGuideConstants";
import Widget from "../Widget";
import Header1WidgetView from "./Header1WidgetView";

export default class Header1Widget extends Widget {
    static type = "Header 1";

    constructor(widgetOrId) {
        super(widgetOrId, Header1Widget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page) {
        return (
            <Header1WidgetView key={this.id} widget={this} page={page} />
        );
    }

    draw(context, x, y, isFirst, campaignGuide, PAGE) {
        const text = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(
                    y +
                        Math.round(HEADER_1_FONT_SIZE / 2) +
                        (isFirst ? HEADER_1_START_TOP : HEADER_1_FONT_SIZE) +
                        this.yNudge
                )
                .withWidth(PAGE.COLUMN_WIDTH)
                .withFontSize(HEADER_1_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withColor(campaignGuide.colorTheme)
        );
        const result = text.draw(context);

        context.save();

        context.fillStyle = campaignGuide.colorTheme;
        context.fillRect(x, result.y + TITLE_UNDERLINE.OFFSET, PAGE.COLUMN_WIDTH, TITLE_UNDERLINE.THICKNESS);
        context.fillRect(x, result.y + TITLE_UNDERLINE.SECOND_OFFSET, PAGE.COLUMN_WIDTH, TITLE_UNDERLINE.THICKNESS);

        context.restore();

        result.y += HEADER_1_BOTTOM_MARGIN;
        return result;
    }
}
