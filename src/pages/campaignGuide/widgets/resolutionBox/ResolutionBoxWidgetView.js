import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";

export default function ResolutionBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <WidgetView widget={widget} page={page} className="deco-box-widget-view">
            <label>
                Top bracket: <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            </label>
            <textarea value={widget.text} onChange={(event) => setText(event.target.value)} />
            <label>
                Bottom bracket: <input type="checkbox" checked={widget.bottomBracket} onChange={() => toggleBottomBracket()} />
            </label>
        </WidgetView>
    );

    function toggleTopBracket() {
        widget.topBracket = !widget.topBracket;
        refreshCampaign();
    }

    function setText(text) {
        widget.text = text;
        refreshCampaign();
    }

    function toggleBottomBracket() {
        widget.bottomBracket = !widget.bottomBracket;
        refreshCampaign();
    }
}
