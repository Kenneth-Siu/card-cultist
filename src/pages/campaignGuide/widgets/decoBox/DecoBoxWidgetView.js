import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextInput from "../../../../components/debouncedInputs/DebouncedTextInput";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function DecoBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="deco-box-widget-view">
            <label>
                Top bracket: <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            </label>
            <DebouncedTextInput value={widget.color} setValue={setColor} />
            <DebouncedTextInput value={widget.title} setValue={setTitle} />
            <DebouncedTextInput value={widget.subtitle} setValue={setSubtitle} />
            <DebouncedTextareaInput value={widget.text} setValue={setText} />
            <label>
                Bottom bracket: <input type="checkbox" checked={widget.bottomBracket} onChange={() => toggleBottomBracket()} />
            </label>
        </WidgetView>
    );

    function toggleTopBracket() {
        widget.topBracket = !widget.topBracket;
        refreshCampaign();
    }

    function setColor(value) {
        widget.color = value;
        refreshCampaign();
    }

    function setTitle(value) {
        widget.title = value;
        refreshCampaign();
    }

    function setSubtitle(value) {
        widget.subtitle = value;
        refreshCampaign();
    }

    function setText(value) {
        widget.text = value;
        refreshCampaign();
    }

    function toggleBottomBracket() {
        widget.bottomBracket = !widget.bottomBracket;
        refreshCampaign();
    }
}
