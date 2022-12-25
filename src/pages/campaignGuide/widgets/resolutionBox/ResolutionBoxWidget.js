import DecoBoxWidget from "../decoBox/DecoBoxWidget";
import ResolutionBoxWidgetView from "./ResolutionBoxWidgetView";

export default class ResolutionBoxWidget extends DecoBoxWidget {
    static type = "Resolution Box";
    static color = "rgb(95, 33, 24)";

    constructor(widgetOrId, campaignGuide) {
        super(widgetOrId, campaignGuide, ResolutionBoxWidget.type);
        this.color = ResolutionBoxWidget.color;
        this.title = "DO NOT READ";
        this.subtitle = "until the end of the scenario";
    }

    getView(page) {
        return <ResolutionBoxWidgetView key={this.id} widget={this} page={page} />;
    }

    drawTitle(context, x, y, PAGE, isTransparent) {
        if (!this.topBracket) {
            return { y, w: 0 };
        }
        return super.drawTitle(context, x, y, PAGE, isTransparent);
    }

    drawSubtitle(context, x, y, PAGE, isTransparent) {
        if (!this.topBracket) {
            return { y, w: 0 };
        }
        return super.drawSubtitle(context, x, y, PAGE, isTransparent);
    }
}
