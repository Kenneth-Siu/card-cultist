import React, { useContext, useState } from "react";
import A4PageCanvas from "./A4PageCanvas";
import listOfWidgetTypes from "../../widgets/listOfWidgetTypes";
import Container from "../../../../components/container/Container";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function A4PageView({ page, pageNumber }) {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newLeftWidgetType, setNewLeftWidgetType] = useState(listOfWidgetTypes[0].type);
    const [newRightWidgetType, setNewRightWidgetType] = useState(listOfWidgetTypes[0].type);

    return (
        <Container className="page-view">
            <button onClick={() => deletePage()}>Delete Page</button>
            <div className="editor-container">
                <A4PageCanvas page={page} pageNumber={pageNumber} />
                <div className="form-container">
                    <div className="left-column">
                        {page.leftColumnWidgets.map((widget) => widget.getView(page))}
                        <select value={newLeftWidgetType} onChange={(event) => setNewLeftWidgetType(event.target.value)}>
                            {listOfWidgetTypes.map((widgetType) => (
                                <option key={widgetType.type} value={widgetType.type}>
                                    {widgetType.type}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => addWidgetToLeftColumn()} className="add-widget-button">
                            + Widget
                        </button>
                    </div>
                    <div className="right-column">
                        {page.rightColumnWidgets.map((widget) => widget.getView(page))}
                        <select value={newRightWidgetType} onChange={(event) => setNewRightWidgetType(event.target.value)}>
                            {listOfWidgetTypes.map((widgetType) => (
                                <option key={widgetType.type} value={widgetType.type}>
                                    {widgetType.type}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => addWidgetToRightColumn()} className="add-widget-button">
                            + Widget
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );

    function deletePage() {
        campaign.campaignGuide.deletePage(page);
        refreshCampaign();
    }

    function addWidgetToLeftColumn() {
        page.addWidgetToLeftColumn(newLeftWidgetType, campaign.campaignGuide);
        refreshCampaign();
    }

    function addWidgetToRightColumn() {
        page.addWidgetToRightColumn(newRightWidgetType, campaign.campaignGuide);
        refreshCampaign();
    }
}
