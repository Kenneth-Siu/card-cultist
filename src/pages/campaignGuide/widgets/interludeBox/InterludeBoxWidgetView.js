import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";
import DebouncedTextInput from "../../../../components/debouncedInputs/DebouncedTextInput";

export default function InterludeBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="interlude-box-widget-view">
            <DebouncedTextInput value={widget.color} setValue={setColor} />
            <DebouncedTextareaInput value={widget.text} setValue={setText} />
        </WidgetView>
    );

    function setColor(color) {
        widget.color = color;
        refreshCampaign();
    }

    function setText(value) {
        widget.text = value;
        refreshCampaign();
    }
}
