import React, { useContext } from "react";
import { CampaignContext } from "../../../components/CampaignContext";

export default function WidgetView({ widget, page, children, className }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <div className={`widget-view ${className}`}>
            <div className="heading-container">
                <label>{widget.type}</label>
                <div className="widget-toolbar">
                    <button onClick={() => swapUp()} title="Swap widget up">⬆</button>
                    <button onClick={() => swapDown()} title="Swap widget down">⬇</button>
                    <button
                        onClick={() => {
                            setXNudge(0);
                            setYNudge(0);
                        }}
                        title="Reset widget to default position"
                    >
                        🔄
                    </button>
                    <button
                        onClick={(event) => setXNudge(widget.xNudge - getNudge(event))}
                        title="Nudge widget left"
                    >
                        👈
                    </button>
                    <button
                        onClick={(event) => setXNudge(widget.xNudge + getNudge(event))}
                        title="Nudge widget right"
                    >
                        👉
                    </button>
                    <button
                        onClick={(event) => setYNudge(widget.yNudge - getNudge(event))}
                        title="Nudge widget up"
                    >
                        👆
                    </button>
                    <button
                        onClick={(event) => setYNudge(widget.yNudge + getNudge(event))}
                        title="Nudge widget down"
                    >
                        👇
                    </button>
                    <button
                        onClick={() => deleteWidget()}
                        title="Delete widget"
                    >
                        ❌
                    </button>
                </div>
            </div>
            {children}
        </div>
    );

    function swapUp() {
        page.swapWidgetUp(widget);
        refreshCampaign();
    }

    function swapDown() {
        page.swapWidgetDown(widget);
        refreshCampaign();
    }

    function getNudge(event) {
        return event.ctrlKey || event.metaKey ? 10 : event.shiftKey ? 100 : 1;
    }

    function setXNudge(xNudge) {
        widget.xNudge = xNudge;
        refreshCampaign();
    }

    function setYNudge(yNudge) {
        widget.yNudge = yNudge;
        refreshCampaign();
    }

    function deleteWidget() {
        page.deleteWidget(widget);
        refreshCampaign();
    }
}
