import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import WidgetView from "../WidgetView";
import DebouncedTextInput from "../../../../components/debouncedInputs/DebouncedTextInput";
import remove from "lodash.remove";
import "./ContentsWidgetView.scss";

export default function ContentsWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <WidgetView widget={widget} page={page} className="contents-widget-view">
            <div className="input-container">
                <label>Spacing</label>
                <input type="number" step="1" min="0" value={widget.spacing} onChange={(event) => setSpacing(parseInt(event.target.value))} />
            </div>
            <div className="input-container sections-list">
                {widget.sections.map((section, index) => (
                    <div className="section-row" key={index}>
                        <DebouncedTextInput
                            value={section.title}
                            setValue={(text) => {
                                section.title = text;
                                refreshCampaign();
                            }}
                        />
                        <input
                            type="number"
                            step="1"
                            min="0"
                            value={section.pageNumber}
                            onChange={(event) => {
                                section.pageNumber = parseInt(event.target.value);
                                refreshCampaign();
                            }}
                        />
                        <button onClick={() => deleteSection(section)}>❌</button>
                    </div>
                ))}
                <button onClick={() => addSection()}>Add Section</button>
            </div>
        </WidgetView>
    );

    function setSpacing(spacing) {
        widget.spacing = spacing;
        refreshCampaign();
    }

    function addSection() {
        widget.sections.push({ title: "", pageNumber: 0 });
        refreshCampaign();
    }

    function deleteSection(section) {
        remove(widget.sections, (o) => o === section);
        refreshCampaign();
    }
}
