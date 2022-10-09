import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import Widget from "../Widget";
import SectionHeaderWidgetView from "./SectionHeaderWidgetView";

export default class SectionHeaderWidget extends Widget {
    static type = "Section Header";

    constructor(widgetOrId) {
        super(widgetOrId, SectionHeaderWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page, campaign, setCampaign) {
        return (
            <SectionHeaderWidgetView
                key={this.id}
                widget={this}
                page={page}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    draw(context, x, y, isFirst) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(y + 16 + (isFirst ? 0 : 32) + this.yNudge)
                .withWidth(488)
                .withFontSize(31)
                .withFontFamily("Teutonic")
        );

        return layer.draw(context);
    }
}
