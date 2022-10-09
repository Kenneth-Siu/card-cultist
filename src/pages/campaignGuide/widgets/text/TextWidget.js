import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
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
                .withY(y + 9 + (isFirst ? 0 : 23) + this.yNudge)
                .withWidth(488)
                .withFontSize(17.5)
                .withLineHeight(1.32)
        );

        return layer.draw(context);
    }
}
