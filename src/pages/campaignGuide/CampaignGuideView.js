import React, { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import listOfPageTypes from "./pages/listOfPageTypes";
import "./CampaignGuideView.scss";
import { CampaignContext } from "../../components/CampaignContext";

export default function CampaignGuide() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newPageType, setNewPageType] = useState(listOfPageTypes[0].type);

    return (
        <main className="campaign-guide-page">
            <div>
                <button onClick={() => downloadPDF()}>Export as PDF</button>
            </div>
            <div>
                {campaign.campaignGuide.pages.map((page, index) => page.getView(index + 1))}
                <select value={newPageType} onChange={(event) => setNewPageType(event.target.value)}>
                    {listOfPageTypes.map((pageType) => (
                        <option key={pageType.type} value={pageType.type}>
                            {pageType.type}
                        </option>
                    ))}
                </select>
                <button className="add-page-button" onClick={() => addPage()}>
                    + Page
                </button>
            </div>
        </main>
    );

    function addPage() {
        campaign.campaignGuide.addPage(newPageType);
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
        pdf.save("campaignGuide.pdf");
    }
}
