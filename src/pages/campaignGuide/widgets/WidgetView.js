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
                    <button onClick={(event) => setXNudge(widget.xNudge - getNudge(event))}>👈</button>
                    <button onClick={(event) => setXNudge(widget.xNudge + getNudge(event))}>👉</button>
                    <button onClick={(event) => setYNudge(widget.yNudge - getNudge(event))}>👆</button>
                    <button onClick={(event) => setYNudge(widget.yNudge + getNudge(event))}>👇</button>
                    <button onClick={() => deleteWidget()}>❌</button>
                </div>
            </div>
            {children}
        </div>
    );

    function getNudge(event) {
        return event.ctrlKey || event.metaKey ? 10 : event.shiftKey ? 100 : 1;
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
