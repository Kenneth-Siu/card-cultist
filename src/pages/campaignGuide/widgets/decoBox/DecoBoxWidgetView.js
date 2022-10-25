import React from "react";
import WidgetView from "../WidgetView";

export default function DecoBoxWidgetView({ widget, page, campaign, setCampaign }) {
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
            <input type="text" value={widget.color} onChange={(event) => setColor(event.target.value)} />
            <input type="text" value={widget.title} onChange={(event) => setTitle(event.target.value)} />
            <input type="text" value={widget.subtitle} onChange={(event) => setSubtitle(event.target.value)} />
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

    function setColor(color) {
        widget.color = color;
        setCampaign(campaign.clone());
    }

    function setTitle(title) {
        widget.title = title;
        setCampaign(campaign.clone());
    }

    function setSubtitle(subtitle) {
        widget.subtitle = subtitle;
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

    function setXNudge(xNudge) {
        widget.xNudge = xNudge;
        setCampaign(campaign.clone());
    }

    function setYNudge(yNudge) {
        widget.yNudge = yNudge;
        setCampaign(campaign.clone());
    }

    function deleteWidget() {
        page.deleteWidget(widget);
        setCampaign(campaign.clone());
    }
}
