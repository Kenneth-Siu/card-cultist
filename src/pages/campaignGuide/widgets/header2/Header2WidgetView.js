import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";

export default function Header2WidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <WidgetView widget={widget} page={page} className="header-2-widget-view">
            <input type="text" value={widget.text} onChange={(event) => setText(event.target.value)} />
        </WidgetView>
    );

    function setText(text) {
        widget.text = text;
        refreshCampaign();
    }
}
