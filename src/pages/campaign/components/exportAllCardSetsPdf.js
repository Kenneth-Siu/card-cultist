import exportPdfToFile from "../../cardSet/components/exportPdfToFile";
import collectPrintFaces from "../../../helpers/pdfExport/collectPrintFaces";

/**
 * Exports all card sets in a campaign to separate PDF files in the filesystem.
 * Uses sequential rendering to avoid memory issues with large campaigns.
 * Saves to print-and-play-{paperSize} folder in the campaign directory.
 *
 * @param {Campaign} campaign - The campaign containing card sets
 * @param {string} paperSize - "a4" or "letter"
 * @param {function} onProgress - Callback with (current, total) for progress updates
 * @param {function} setCurrentCardSetId - State setter to trigger rendering of specific card set
 * @returns {Promise<{success: number, failed: number, skipped: number}>}
 */
export default async function exportAllCardSetsPdf(campaign, paperSize, onProgress, setCurrentCardSetId) {
    // Filter to card sets that have cards to export
    const cardSetsToExport = campaign.cardSets.filter(cardSet => {
        const faces = collectPrintFaces(cardSet);
        return faces.length > 0;
    });

    const results = {
        success: 0,
        failed: 0,
        skipped: campaign.cardSets.length - cardSetsToExport.length
    };

    // Determine subfolder based on paper size
    const subfolder = `print-and-play-${paperSize}`;

    // Export each card set sequentially
    for (let i = 0; i < cardSetsToExport.length; i++) {
        const cardSet = cardSetsToExport[i];

        try {
            // Trigger rendering of this card set's canvases
            setCurrentCardSetId(cardSet.id);

            // Wait for canvases to be ready
            await waitForCanvasesReady();

            // Export to PDF file
            await exportPdfToFile(cardSet, paperSize, campaign.path, subfolder);
            results.success++;
        } catch (error) {
            console.error(`Failed to export ${cardSet.getTitle()}:`, error);
            results.failed++;
        }

        // Cleanup canvases
        setCurrentCardSetId(null);
        await delay(200); // Allow cleanup before next render

        // Update progress
        onProgress(i + 1, cardSetsToExport.length);
    }

    return results;
}

/**
 * Waits for canvases to be rendered in the DOM
 * This promise is resolved by CampaignPdfExporter's onCanvasesReady callback
 */
function waitForCanvasesReady() {
    return new Promise((resolve) => {
        window._campaignPdfExportResolve = resolve;
    });
}

/**
 * Helper to delay execution
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
