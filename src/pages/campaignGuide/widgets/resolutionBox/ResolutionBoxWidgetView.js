import React from "react";
import WidgetView from "../WidgetView";

export default function ResolutionBoxWidgetView({ widget, page, campaign, setCampaign }) {
    return (
        <WidgetView
            widget={widget}
            page={page}
            campaign={campaign}
            setCampaign={setCampaign}
            className="deco-box-widget-view"
        >
            <label>
                Top bracket: <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            </label>
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
            <label>
                Bottom bracket:{" "}
                <input type="checkbox" checked={widget.bottomBracket} onChange={() => toggleBottomBracket()} />
            </label>
        </WidgetView>
    );

    function toggleTopBracket() {
        widget.topBracket = !widget.topBracket;
        setCampaign(campaign.clone());
    }

    function setText(text) {
        widget.text = text;
        setCampaign(campaign.clone());
    }

    function toggleBottomBracket() {
        widget.bottomBracket = !widget.bottomBracket;
        setCampaign(campaign.clone());
    }
}
