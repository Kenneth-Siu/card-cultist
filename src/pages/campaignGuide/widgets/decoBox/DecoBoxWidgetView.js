import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";

export default function DecoBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <WidgetView widget={widget} page={page} className="deco-box-widget-view">
            <label>
                Top bracket: <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            </label>
            <input type="text" value={widget.color} onChange={(event) => setColor(event.target.value)} />
            <input type="text" value={widget.title} onChange={(event) => setTitle(event.target.value)} />
            <input type="text" value={widget.subtitle} onChange={(event) => setSubtitle(event.target.value)} />
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
            <label>
                Bottom bracket: <input type="checkbox" checked={widget.bottomBracket} onChange={() => toggleBottomBracket()} />
            </label>
        </WidgetView>
    );

    function toggleTopBracket() {
        widget.topBracket = !widget.topBracket;
        refreshCampaign();
    }

    function setColor(color) {
        widget.color = color;
        refreshCampaign();
    }

    function setTitle(title) {
        widget.title = title;
        refreshCampaign();
    }

    function setSubtitle(subtitle) {
        widget.subtitle = subtitle;
        refreshCampaign();
    }

    function setText(text) {
        widget.text = text;
        refreshCampaign();
    }

    function toggleBottomBracket() {
        widget.bottomBracket = !widget.bottomBracket;
        refreshCampaign();
    }
}
