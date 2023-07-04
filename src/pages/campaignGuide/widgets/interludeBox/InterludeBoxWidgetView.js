import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";

export default function InterludeBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <WidgetView widget={widget} page={page} className="interlude-box-widget-view">
            <input type="text" value={widget.color} onChange={(event) => setColor(event.target.value)} />
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
        </WidgetView>
    );

    function setColor(color) {
        widget.color = color;
        refreshCampaign();
    }

    function setText(text) {
        widget.text = text;
        refreshCampaign();
    }
}
