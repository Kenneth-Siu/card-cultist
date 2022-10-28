import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import {
    COLUMN_WIDTH,
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
                .withY(
                    y +
                        Math.round(HEADER_1_FONT_SIZE / 2) +
                        (isFirst ? HEADER_1_START_TOP : HEADER_1_FONT_SIZE) +
                        this.yNudge
                )
                .withWidth(COLUMN_WIDTH)
                .withFontSize(HEADER_1_FONT_SIZE)
                .withFontFamily("Teutonic")
                .withColor(campaignGuide.colorTheme)
        );
        const result = text.draw(context);

        context.save();

        context.fillStyle = campaignGuide.colorTheme;
        context.fillRect(x, result.y + TITLE_UNDERLINE.OFFSET, COLUMN_WIDTH, TITLE_UNDERLINE.THICKNESS);
        context.fillRect(x, result.y + TITLE_UNDERLINE.SECOND_OFFSET, COLUMN_WIDTH, TITLE_UNDERLINE.THICKNESS);

        context.restore();

        result.y += HEADER_1_BOTTOM_MARGIN;
        return result;
    }
}
