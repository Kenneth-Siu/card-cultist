import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "./CampaignGuide.scss";
import CampaignGuideCanvas from "./CampaignGuideCanvas";

export default function CampaignGuide({ campaign, setCampaign }) {
    return (
        <>
            <main className="campaign-guide-page">
                <button onClick={() => downloadPDF()}>Export as PDF</button>
                <div className="working-container">
                    <CampaignGuideCanvas campaign={campaign} />
                    <div className="form-container">
                        <textarea value={campaign.campaignGuide} onChange={(event) => setText(event.target.value)} />
                    </div>
                </div>
            </main>
        </>
    );

    function setText(text) {
        campaign.campaignGuide = text;
        setCampaign(campaign.clone());
    }

    function downloadPDF() {
        const pdf = new jsPDF({
            unit: "px",
            hotfixes: ["px_scaling"],
            format: [1125, 1125],
        });
        pdf.addImage(document.querySelector(".campaign-guide-page canvas"), "PNG", 0, 0, 1125, 1125);
        pdf.save("campaignGuide.pdf");
    }
}
