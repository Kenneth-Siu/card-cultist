import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { COLUMN_WIDTH, PARAGRAPH_FONT_SIZE, PARAGRAPH_LINE_HEIGHT } from "../../canvasConstants";
import Widget from "../Widget";
import TextWidgetView from "./TextWidgetView";

export default class TextWidget extends Widget {
    static type = "Text";

    constructor(widgetOrId) {
        super(widgetOrId, TextWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page, campaign, setCampaign) {
        return <TextWidgetView key={this.id} widget={this} page={page} campaign={campaign} setCampaign={setCampaign} />;
    }

    draw(context, x, y, isFirst) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(
                    y +
                        Math.round(PARAGRAPH_FONT_SIZE / 2) +
                        (isFirst ? 0 : Math.round(PARAGRAPH_LINE_HEIGHT * PARAGRAPH_FONT_SIZE)) +
                        this.yNudge
                )
                .withWidth(COLUMN_WIDTH)
                .withFontSize(PARAGRAPH_FONT_SIZE)
                .withLineHeight(PARAGRAPH_LINE_HEIGHT)
        );

        return layer.draw(context);
    }
}
