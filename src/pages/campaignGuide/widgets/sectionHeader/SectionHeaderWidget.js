import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { COLUMN_WIDTH, SECTION_HEADER_FONT_SIZE } from "../../canvasConstants";
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
                .withY(
                    y +
                        Math.round(SECTION_HEADER_FONT_SIZE / 2) +
                        (isFirst ? 5 : SECTION_HEADER_FONT_SIZE) +
                        this.yNudge
                )
                .withWidth(COLUMN_WIDTH)
                .withFontSize(SECTION_HEADER_FONT_SIZE)
                .withFontFamily("Teutonic")
        );

        return layer.draw(context);
    }
}
