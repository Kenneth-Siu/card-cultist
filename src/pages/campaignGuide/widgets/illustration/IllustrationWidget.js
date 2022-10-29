import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import ImageTransform from "../../../../models/ImageTransform";
import Widget from "../Widget";
import IllustrationWidgetView from "./IllustrationWidgetView";

export default class IllustrationWidget extends Widget {
    static type = "Illustration";
    static dictionary = {};

    constructor(widgetOrId) {
        super(widgetOrId, IllustrationWidget.type);
        const widget = typeof widgetOrId === "number" || !widgetOrId ? {} : widgetOrId;
        this.path = widget.path || null;
        this.transform = new ImageTransform(widget.transform);
    }

    getView(page, campaign, setCampaign) {
        return (
            <IllustrationWidgetView
                key={this.id}
                widget={this}
                page={page}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    draw(context, x, y) {
        if (!this.path || !IllustrationWidget.dictionary[this.id]) {
            return { y, w: 0 };
        }
        const layer = new CanvasImageLayer(
            IllustrationWidget.dictionary[this.id],
            this.transform.withX(x + this.xNudge).withY(y + this.yNudge)
        );
        return layer.draw(context);
    }
}
