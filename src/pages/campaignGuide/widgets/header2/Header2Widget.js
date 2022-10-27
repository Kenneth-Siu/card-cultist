import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { COLUMN_WIDTH, HEADER_2_FONT_SIZE, HEADER_2_START_TOP } from "../../canvasConstants";
import Widget from "../Widget";
import Header2WidgetView from "./Header2WidgetView";

export default class Header2Widget extends Widget {
    static type = "Header 2";

    constructor(widgetOrId) {
        super(widgetOrId, Header2Widget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page, campaign, setCampaign) {
        return (
            <Header2WidgetView key={this.id} widget={this} page={page} campaign={campaign} setCampaign={setCampaign} />
        );
    }

    draw(context, x, y, isFirst, campaignGuide) {
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(
                    y +
                        Math.round(HEADER_2_FONT_SIZE / 2) +
                        (isFirst ? HEADER_2_START_TOP : HEADER_2_FONT_SIZE) +
                        this.yNudge
                )
                .withWidth(COLUMN_WIDTH)
                .withFontSize(HEADER_2_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withColor(campaignGuide.colorTheme)
        );

        return layer.draw(context);
    }
}
