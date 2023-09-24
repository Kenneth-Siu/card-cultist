import React, { useContext, useState } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import useDebounce from "../../../../helpers/useDebounce";

export default function TextWidgetView({ widget, page }) {
    const [text, setText] = useState(widget.text);
    const { refreshCampaign } = useContext(CampaignContext);

    const debouncedUpdate = useDebounce(() => {
        widget.text = text;
        refreshCampaign();
    });

    const updateText = (newText) => {
        setText(newText);
        debouncedUpdate();
    };

    return (
        <WidgetView widget={widget} page={page} className="text-widget-view">
            <textarea value={text} onChange={(event) => updateText(event.target.value)} />
        </WidgetView>
    );
}
