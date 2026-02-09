import React from "react";
import { useHistory } from "react-router-dom";

/**
 * Button component that navigates to the campaign export page.
 *
 * @param {Campaign} campaign - The campaign to export
 */
export default function CampaignPdfExportButton({ campaign }) {
    const history = useHistory();

    // Check if there are any card sets to export
    const hasCardSets = campaign && campaign.cardSets && campaign.cardSets.length > 0;

    function handleClick() {
        history.push("/campaign-export");
    }

    return (
        <button
            onClick={handleClick}
            disabled={!hasCardSets}
            title={!hasCardSets ? "No card sets to export" : "Export all card sets to PDF files"}
        >
            Export All Sets for Print (PDF)
        </button>
    );
}
