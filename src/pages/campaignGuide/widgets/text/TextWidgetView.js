import React from "react";
import WidgetView from "../WidgetView";

export default function TextWidgetView({ widget, page, campaign, setCampaign }) {
    return (
        <WidgetView
            widget={widget}
            page={page}
            campaign={campaign}
            setCampaign={setCampaign}
            className="text-widget-view"
        >
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
        </WidgetView>
    );

    function setText(text) {
        widget.text = text;
        setCampaign(campaign.clone());
    }
}
