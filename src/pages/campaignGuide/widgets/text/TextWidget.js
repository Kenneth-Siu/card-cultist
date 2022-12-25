import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { PARAGRAPH } from "../../campaignGuideConstants";
import Widget from "../Widget";
import TextWidgetView from "./TextWidgetView";

export default class TextWidget extends Widget {
    static type = "Text";

    constructor(widgetOrId) {
        super(widgetOrId, TextWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page) {
        return <TextWidgetView key={this.id} widget={this} page={page} />;
    }

    draw(context, x, y, isFirst, campaignGuide, PAGE) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(y + this.yNudge)
                .withWidth(PAGE.COLUMN_WIDTH)
                .withFontSize(PARAGRAPH.FONT_SIZE)
                .withLineHeight(PARAGRAPH.LINE_HEIGHT)
                .withHighlightColor(campaignGuide.colorTheme)
        );

        return layer.draw(context);
    }
}
