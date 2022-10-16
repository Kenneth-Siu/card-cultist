import React from "react";

export default function DecoBoxWidgetView({ widget, page, campaign, setCampaign }) {
    return (
        <div className="deco-box-widget-view">
            <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            <input type="text" value={widget.color} onChange={(event) => setColor(event.target.value)} />
            <input type="text" value={widget.title} onChange={(event) => setTitle(event.target.value)} />
            <input type="text" value={widget.subtitle} onChange={(event) => setSubtitle(event.target.value)} />
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
            <input type="checkbox" checked={widget.bottomBracket} onChange={() => toggleBottomBracket()} />

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
