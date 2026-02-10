import { jsPDF } from "jspdf";
import {
    NO_BLEED_COLS,
    NO_BLEED_ROWS,
    NO_BLEED_PAGE_WIDTH,
    NO_BLEED_PAGE_HEIGHT
} from "../../../helpers/pdfExport/pdfExportConfig";
import { CARD_PORTRAIT_WIDTH, CARD_PORTRAIT_HEIGHT } from "../../card/cardConstants";
import { collectPrintFacesGrouped } from "../../../helpers/pdfExport/collectPrintFaces";
import rotateLandscapeToPortrait from "../../../helpers/pdfExport/rotateLandscapeToPortrait";
import cleanFileName from "../../../helpers/cleanFileName";

/**
 * Exports a card set to a printable PDF file in the filesystem with no bleed and no crop marks.
 * Cards are arranged in a 3x3 grid at native 750x1050 size.
 * Page size is exactly 2250x3150 (3x3 grid).
 *
 * @param {CardSet} cardSet - The card set to export
 * @param {string} campaignPath - Path to the campaign folder
 * @param {string} subfolder - Subfolder to save in (e.g., "print-and-play-no-crop")
 * @param {string|null} cardSetId - Optional card set ID to scope canvas query (for multi-set exports)
 * @returns {Promise<void>}
 */
export default async function exportPdfNoCropToFile(cardSet, campaignPath, subfolder, cardSetId = null) {
    // Collect faces grouped for double-sided printing
    const { fronts, backs } = collectPrintFacesGrouped(cardSet);

    if (fronts.length === 0) {
        return; // Skip empty card sets silently
    }

    // Get canvas elements from the DOM
    // Query within the specific card set's container if ID provided
    const containerSelector = cardSetId
        ? `[data-cardset-id="${cardSetId}"]`
        : null;
    const rootElement = containerSelector
        ? document.querySelector(containerSelector)
        : document;

    const frontCanvases = Array.from(
        rootElement.querySelectorAll(".export-card-front-canvases-container canvas")
    );
    const backCanvases = Array.from(
        rootElement.querySelectorAll(".export-card-back-canvases-container canvas")
    );

    // Helper to get canvas for a face entry
    const getCanvasForFace = (faceEntry) => {
        if (faceEntry.isEmpty) {
            return null;
        }
        const canvas = faceEntry.side === "front"
            ? frontCanvases[faceEntry.cardIndex]
            : backCanvases[faceEntry.cardIndex];
        return {
            canvas,
            isLandscape: canvas?.classList.contains("landscape")
        };
    };

    // Convert pixels to points (72 points = 1 inch, 300 DPI)
    const pxToPt = 72 / 300;

    // Calculate layout (no margins, cards at native size)
    const cardsPerPage = NO_BLEED_COLS * NO_BLEED_ROWS;

    // Create PDF using points (native PDF unit)
    const pdf = new jsPDF({
        unit: "pt",
        format: [NO_BLEED_PAGE_WIDTH * pxToPt, NO_BLEED_PAGE_HEIGHT * pxToPt],
        compress: true
    });

    // Create page canvas for compositing (still use pixels for rendering)
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = NO_BLEED_PAGE_WIDTH;
    pageCanvas.height = NO_BLEED_PAGE_HEIGHT;
    const pageCtx = pageCanvas.getContext("2d");

    // Process fronts and backs in alternating pages for double-sided printing
    // Page 1: fronts 0-8, Page 2: backs 0-8 (mirrored), Page 3: fronts 9-17, etc.
    const totalPages = Math.ceil(fronts.length / cardsPerPage) * 2;

    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        const isFrontPage = pageNum % 2 === 0;
        const pageSetIndex = Math.floor(pageNum / 2);
        const startIndex = pageSetIndex * cardsPerPage;
        const facesToRender = isFrontPage ? fronts : backs;

        // Start new page
        if (pageNum > 0) {
            pdf.addPage([NO_BLEED_PAGE_WIDTH * pxToPt, NO_BLEED_PAGE_HEIGHT * pxToPt]);
        }
        // Clear page canvas
        pageCtx.fillStyle = "white";
        pageCtx.fillRect(0, 0, NO_BLEED_PAGE_WIDTH, NO_BLEED_PAGE_HEIGHT);

        // Render cards on this page
        for (let i = 0; i < cardsPerPage; i++) {
            const faceIndex = startIndex + i;
            if (faceIndex >= facesToRender.length) break;

            const faceEntry = facesToRender[faceIndex];
            const faceCanvas = getCanvasForFace(faceEntry);

            // Skip empty slots
            if (!faceCanvas || !faceCanvas.canvas) {
                continue;
            }

            // Calculate position on page (no margins)
            let col = i % NO_BLEED_COLS;
            const row = Math.floor(i / NO_BLEED_COLS);

            // Mirror column position for back pages
            if (!isFrontPage) {
                col = NO_BLEED_COLS - 1 - col;
            }

            const x = col * CARD_PORTRAIT_WIDTH;
            const y = row * CARD_PORTRAIT_HEIGHT;

            // Get source canvas
            let sourceCanvas = faceCanvas.canvas;

            // Rotate landscape cards to portrait
            if (faceCanvas.isLandscape) {
                sourceCanvas = rotateLandscapeToPortrait(sourceCanvas);
            }

            // Draw card at native size (no bleed, no crop marks)
            pageCtx.drawImage(sourceCanvas, x, y);
        }

        // Add page to PDF with dimensions converted to points
        pdf.addImage(pageCanvas, "PNG", 0, 0, NO_BLEED_PAGE_WIDTH * pxToPt, NO_BLEED_PAGE_HEIGHT * pxToPt);
    }

    // Get PDF as array buffer
    const pdfData = pdf.output("arraybuffer");

    // Save to filesystem
    const fileName = `${cleanFileName(cardSet.getTitle())}.pdf`;
    await window.fs.exportFile(
        campaignPath,
        subfolder,
        fileName,
        new DataView(pdfData)
    );
}
