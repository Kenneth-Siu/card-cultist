import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";

export default function TextWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <WidgetView widget={widget} page={page} className="text-widget-view">
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
        </WidgetView>
    );

    function setText(text) {
        widget.text = text;
        refreshCampaign();
    }
}
