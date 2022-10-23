import React from "react";

export default function Header2WidgetView({ widget, page, campaign, setCampaign }) {
    return (
        <div className="section-header-widget-view">
            <input type="text" value={widget.text} onChange={(event) => setText(event.target.value)} />

            <div className="input-container">
                <label>X Nudge</label>
                <input
                    type="number"
                    step="1"
                    value={widget.xNudge}
                    onChange={(event) => setXNudge(parseInt(event.target.value))}
                />
            </div>

            <div className="input-container">
                <label>Y Nudge</label>
                <input
                    type="number"
                    step="1"
                    value={widget.yNudge}
                    onChange={(event) => setYNudge(parseInt(event.target.value))}
                />
            </div>

            <button onClick={() => deleteWidget()}>Delete</button>
        </div>
    );

    function setText(text) {
        widget.text = text;
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
