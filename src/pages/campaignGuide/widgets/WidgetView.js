import React from "react";

export default function WidgetView({ widget, page, campaign, setCampaign, children, className }) {
    return (
        <div className={`widget-view ${className}`}>
            <div className="heading-container">
                <label>{widget.type}</label>
                <div className="widget-toolbar">
                    <button
                        onClick={() => {
                            setXNudge(0);
                            setYNudge(0);
                        }}
                    >
                        🔄
                    </button>
                    <button onClick={() => setXNudge(widget.xNudge - 1)}>👈</button>
                    <button onClick={() => setXNudge(widget.xNudge + 1)}>👉</button>
                    <button onClick={() => setYNudge(widget.yNudge - 1)}>👆</button>
                    <button onClick={() => setYNudge(widget.yNudge + 1)}>👇</button>
                    <button onClick={() => deleteWidget()}>❌</button>
                </div>
            </div>
            {children}
        </div>
    );

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
