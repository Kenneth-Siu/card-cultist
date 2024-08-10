import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function TextWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="text-widget-view">
            <DebouncedTextareaInput value={widget.text} setValue={setText} />
        </WidgetView>
    );

    function setText(value) {
        widget.text = value;
        refreshCampaign();
    }
}
