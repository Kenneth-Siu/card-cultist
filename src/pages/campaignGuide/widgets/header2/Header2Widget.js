import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../../models/CanvasTextConfig";
import { HEADER_2 } from "../../campaignGuideConstants";
import Widget from "../Widget";
import Header2WidgetView from "./Header2WidgetView";

export default class Header2Widget extends Widget {
    static type = "Header 2";

    constructor(widgetOrId) {
        super(widgetOrId, Header2Widget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.text = widget.text || "";
    }

    getView(page) {
        return <Header2WidgetView key={this.id} widget={this} page={page} />;
    }

    draw(context, x, y, isFirst, campaignGuide, PAGE) {
        // context.save();
        // context.fillStyle = "red";
        // context.fillRect(x, y, 200, 1);
        // context.restore();
        const layer = new CanvasTextLayer(
            new CanvasTextConfig()
                .withText(this.text)
                .withX(x + this.xNudge)
                .withY(y + (isFirst ? 0 : HEADER_2.TOP_MARGIN) + this.yNudge)
                .withWidth(PAGE.COLUMN_WIDTH)
                .withFontSize(HEADER_2.FONT_SIZE)
                .withFontFamily("Teutonic")
                .withColor(campaignGuide.colorTheme)
        );

        const result = layer.draw(context);

        result.y += HEADER_2.BOTTOM_MARGIN;
        return result;
    }
}
