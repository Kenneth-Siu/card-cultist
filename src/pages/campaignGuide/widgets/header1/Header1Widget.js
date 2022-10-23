import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { COLUMN_WIDTH, HEADER_1_FONT_SIZE } from "../../canvasConstants";
import Widget from "../Widget";
import Header1WidgetView from "./Header1WidgetView";

export default class Header1Widget extends Widget {
    static type = "Header 1";

    constructor(widgetOrId) {
        super(widgetOrId, Header1Widget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page, campaign, setCampaign) {
        return (
            <Header1WidgetView key={this.id} widget={this} page={page} campaign={campaign} setCampaign={setCampaign} />
        );
    }

    draw(context, x, y, isFirst, campaignGuide) {
        const text = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(y + Math.round(HEADER_1_FONT_SIZE / 2) + (isFirst ? 5 : HEADER_1_FONT_SIZE) + this.yNudge)
                .withWidth(COLUMN_WIDTH)
                .withFontSize(HEADER_1_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withColor(campaignGuide.colorTheme)
        );
        const result = text.draw(context);

        context.save();

        context.fillStyle = this.color;
        context.fillRect(x, result.y + 6, COLUMN_WIDTH, 1);
        context.fillRect(x, result.y + 9, COLUMN_WIDTH, 1);

        context.restore();

        result.y += 5;
        return result;
    }
}
