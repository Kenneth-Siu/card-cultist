import React, { useContext, useState } from "react";
import listOfWidgetTypes from "../widgets/listOfWidgetTypes";
import Container from "../../../components/container/Container";
import { CampaignContext } from "../../../components/CampaignContext";
import IconButton from "../../../components/iconButton/IconButton";
import "./PageView.scss";
import jsPDF from "jspdf";

export default function PageView({ page, pageNumber, toolbarExtras, canvas }) {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newLeftWidgetType, setNewLeftWidgetType] = useState(listOfWidgetTypes[0].type);
    const [newRightWidgetType, setNewRightWidgetType] = useState(listOfWidgetTypes[0].type);

    return (
        <Container className={`page-view page-${pageNumber}`}>
            <Container className="toolbar">
                <IconButton onClick={() => downloadPDF()}>
                    <span className="emoji">💾</span> Export page as PDF
                </IconButton>
                <IconButton onClick={() => swapPageUp()}>
                    <span className="emoji">⬆</span> Swap page up
                </IconButton>
                <IconButton onClick={() => swapPageDown()}>
                    <span className="emoji">⬇</span> Swap page down
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
                            Add Widget
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
                            Add Widget
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

    // TODO: EXTRACT THIS INTO A COMMON THING
    function downloadPDF() {
        const canvasSelector = `.campaign-guide-page .page-${pageNumber} canvas`;
        const pdf = new jsPDF({
            unit: "px",
            hotfixes: ["px_scaling"],
            format: [document.querySelector(canvasSelector).width, document.querySelector(canvasSelector).height],
            compress: true
        });
        document.querySelectorAll(canvasSelector).forEach((page, index) => {
            if (index !== 0) {
                pdf.addPage([page.width, page.height]);
            }
            pdf.addImage(page, "PNG", 0, 0);
        });
        pdf.save(`campaignGuidePage${pageNumber}`);
    }
}
