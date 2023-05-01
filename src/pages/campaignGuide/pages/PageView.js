import React, { useContext, useState } from "react";
import listOfWidgetTypes from "../widgets/listOfWidgetTypes";
import Container from "../../../components/container/Container";
import { CampaignContext } from "../../../components/CampaignContext";
import IconButton from "../../../components/iconButton/IconButton";
import "./PageView.scss";

export default function PageView({ page, toolbarExtras, canvas }) {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newLeftWidgetType, setNewLeftWidgetType] = useState(listOfWidgetTypes[0].type);
    const [newRightWidgetType, setNewRightWidgetType] = useState(listOfWidgetTypes[0].type);

    return (
        <Container className="page-view">
            <Container className="toolbar">
                <IconButton onClick={() => swapPageUp()}>
                    <span className="emoji">⬆</span> Swap up
                </IconButton>
                <IconButton onClick={() => swapPageDown()}>
                    <span className="emoji">⬇</span> Swap down
                </IconButton>
                <IconButton onClick={() => deletePage()}>
                    <span className="emoji">🗑</span> Delete page
                </IconButton>
            </Container>
            {toolbarExtras}
            <div className="editor-container">
                {canvas}
                <div className="form-container">
                    <div className="left-column">
                        {page.leftColumnWidgets.map((widget) => widget.getView(page))}
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
                        {page.rightColumnWidgets.map((widget) => widget.getView(page))}
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

    function swapPageUp() {
        campaign.campaignGuide.swapPageUp(page);
        refreshCampaign();
    }

    function swapPageDown() {
        campaign.campaignGuide.swapPageDown(page);
        refreshCampaign();
    }

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
