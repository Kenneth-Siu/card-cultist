import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextInput from "../../../../components/debouncedInputs/DebouncedTextInput";

export default function Header2WidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="header-2-widget-view">
            <DebouncedTextInput value={widget.text} setValue={setText} />
        </WidgetView>
    );

    function setText(value) {
        widget.text = value;
        refreshCampaign();
    }
}
