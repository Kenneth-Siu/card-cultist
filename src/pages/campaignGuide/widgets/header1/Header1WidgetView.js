import React from "react";
import WidgetView from "../WidgetView";

export default function Header1WidgetView({ widget, page, campaign, setCampaign }) {
    return (
        <WidgetView
            widget={widget}
            page={page}
            campaign={campaign}
            setCampaign={setCampaign}
            className="header-1-widget-view"
        >
            <input type="text" value={widget.text} onChange={(event) => setText(event.target.value)} />
        </WidgetView>
    );

    function setText(text) {
        widget.text = text;
        setCampaign(campaign.clone());
    }
}
