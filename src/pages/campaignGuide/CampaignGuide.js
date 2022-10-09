import React, { useState } from "react";
import { jsPDF } from "jspdf";
import listOfPageTypes from "./pages/listOfPageTypes";
import "./CampaignGuide.scss";

export default function CampaignGuide({ campaign, setCampaign }) {
    const [newPageType, setNewPageType] = useState(listOfPageTypes[0].type);

    return (
        <main className="campaign-guide-page">
            <div>
                <button onClick={() => downloadPDF()}>Export as PDF</button>
            </div>
            <div>
                {campaign.campaignGuide.pages.map((page, index) => page.getView(campaign, setCampaign, index + 1))}
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
        setCampaign(campaign.clone());
    }

    function downloadPDF() {
        const pdf = new jsPDF({
            unit: "px",
            hotfixes: ["px_scaling"],
            format: [1125, 1125],
        });
        document.querySelectorAll(".campaign-guide-page canvas").forEach((page, index) => {
            if (index !== 0) {
                pdf.addPage();
            }
            pdf.addImage(page, "PNG", 0, 0, 1125, 1125);
        });
        pdf.save("campaignGuide.pdf");
    }
}
