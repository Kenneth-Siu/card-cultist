import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function ResolutionBoxWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="deco-box-widget-view">
            <label>
                Top bracket: <input type="checkbox" checked={widget.topBracket} onChange={() => toggleTopBracket()} />
            </label>
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

    function setText(value) {
        widget.text = value;
        refreshCampaign();
    }

    function toggleBottomBracket() {
        widget.bottomBracket = !widget.bottomBracket;
        refreshCampaign();
    }
}
