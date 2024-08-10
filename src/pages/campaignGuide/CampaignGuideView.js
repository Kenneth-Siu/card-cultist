import React, { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import listOfPageTypes from "./pages/listOfPageTypes";
import "./CampaignGuideView.scss";
import { CampaignContext } from "../../components/CampaignContext";
import IconButton from "../../components/iconButton/IconButton";

export default function CampaignGuide() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newPageType, setNewPageType] = useState(listOfPageTypes[0].type);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    return (
        <main className="campaign-guide-page">
            <div className="toolbar">
                <div className="page-navigation">
                    <label>Page {currentPageIndex + 1}</label>
                    <input
                        type={"range"}
                        min={1}
                        max={campaign.campaignGuide.pages.length}
                        value={currentPageIndex + 1}
                        onChange={(event) => setCurrentPageIndex(event.target.value - 1)}
                    />
                </div>
                <select value={newPageType} onChange={(event) => setNewPageType(event.target.value)}>
                    {listOfPageTypes.map((pageType) => (
                        <option key={pageType.type} value={pageType.type}>
                            {pageType.type}
                        </option>
                    ))}
                </select>
                <IconButton onClick={() => addPage()}>
                    <span className="emoji">➕</span> Add page after this
                </IconButton>
                <IconButton onClick={() => downloadPDF()}>
                    <span className="emoji">💾</span> Export entire campaign guide as PDF
                </IconButton>
            </div>
            <div>
                {campaign.campaignGuide.pages[currentPageIndex].getView(currentPageIndex + 1)}
            </div>
        </main>
    );

    function addPage() {
        campaign.campaignGuide.addPage(newPageType, currentPageIndex + 1);
        refreshCampaign();
    }

    function downloadPDF() {
        const pdf = new jsPDF({
            unit: "px",
            hotfixes: ["px_scaling"],
            format: [document.querySelector(".campaign-guide-page canvas").width, document.querySelector(".campaign-guide-page canvas").height],
            compress: true
        });
        document.querySelectorAll(".campaign-guide-page canvas").forEach((page, index) => {
            if (index !== 0) {
                pdf.addPage([page.width, page.height]);
            }
            pdf.addImage(page, "PNG", 0, 0);
        });
        pdf.save("campaignGuide");
    }
}
