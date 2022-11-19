import React, { useState } from "react";
import SquarePageCanvas from "./SquarePageCanvas";
import listOfWidgetTypes from "../../widgets/listOfWidgetTypes";
import Container from "../../../../components/container/Container";

export default function SquarePageView({ page, pageNumber, campaign, setCampaign }) {
    const [newLeftWidgetType, setNewLeftWidgetType] = useState(listOfWidgetTypes[0].type);
    const [newRightWidgetType, setNewRightWidgetType] = useState(listOfWidgetTypes[0].type);

    return (
        <Container className="page-view">
            <button onClick={() => deletePage()}>Delete Page</button>
            <div className="editor-container">
                <SquarePageCanvas page={page} pageNumber={pageNumber} campaign={campaign} />
                <div className="form-container">
                    <div className="left-column">
                        {page.leftColumnWidgets.map((widget) => widget.getView(page, campaign, setCampaign))}
                        <select
                            value={newLeftWidgetType}
                            onChange={(event) => setNewLeftWidgetType(event.target.value)}
                        >
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
                        {page.rightColumnWidgets.map((widget) => widget.getView(page, campaign, setCampaign))}
                        <select
                            value={newRightWidgetType}
                            onChange={(event) => setNewRightWidgetType(event.target.value)}
                        >
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
        setCampaign(campaign.clone());
    }

    function addWidgetToLeftColumn() {
        page.addWidgetToLeftColumn(newLeftWidgetType, campaign.campaignGuide);
        setCampaign(campaign.clone());
    }

    function addWidgetToRightColumn() {
        page.addWidgetToRightColumn(newRightWidgetType, campaign.campaignGuide);
        setCampaign(campaign.clone());
    }
}
