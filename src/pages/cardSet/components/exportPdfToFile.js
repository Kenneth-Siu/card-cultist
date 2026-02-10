import { jsPDF } from "jspdf";
import {
    PAPER_CONFIGS,
    BLEED_PX,
    CARD_WITH_BLEED_WIDTH,
    CARD_WITH_BLEED_HEIGHT
} from "../../../helpers/pdfExport/pdfExportConfig";
import createBleedCanvas from "../../../helpers/pdfExport/createBleedCanvas";
import drawCropMarks from "../../../helpers/pdfExport/drawCropMarks";
import collectPrintFaces, { collectPrintFacesGrouped } from "../../../helpers/pdfExport/collectPrintFaces";
import rotateLandscapeToPortrait from "../../../helpers/pdfExport/rotateLandscapeToPortrait";
import cleanFileName from "../../../helpers/cleanFileName";

/**
 * Exports a card set to a printable PDF file in the filesystem.
 * Similar to exportPdf but saves to a file instead of triggering browser download.
 *
 * @param {CardSet} cardSet - The card set to export
 * @param {string} paperSize - "a4" or "letter"
 * @param {string} campaignPath - Path to the campaign folder
 * @param {string} subfolder - Subfolder to save in (e.g., "print-and-play-a4")
 * @param {string|null} cardSetId - Optional card set ID to scope canvas query (for multi-set exports)
 * @returns {Promise<void>}
 */
export default async function exportPdfToFile(cardSet, paperSize, campaignPath, subfolder, cardSetId = null) {
    const config = PAPER_CONFIGS[paperSize];
    if (!config) {
        throw new Error(`Unknown paper size: ${paperSize}`);
    }

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

    // Calculate layout
    const cardsPerPage = config.cols * config.rows;
    const gridWidth = config.cols * CARD_WITH_BLEED_WIDTH;
    const gridHeight = config.rows * CARD_WITH_BLEED_HEIGHT;

    // Create PDF sized exactly to the card grid (no margins)
    const pdf = new jsPDF({
        unit: "pt",
        format: [gridWidth * pxToPt, gridHeight * pxToPt],
        compress: true
    });

    // Create page canvas sized exactly to the card grid
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = gridWidth;
    pageCanvas.height = gridHeight;
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
            pdf.addPage([gridWidth * pxToPt, gridHeight * pxToPt]);
        }
        // Clear page canvas
        pageCtx.fillStyle = "white";
        pageCtx.fillRect(0, 0, gridWidth, gridHeight);

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

            // Calculate position on page (no margins, cards fill entire page)
            let col = i % config.cols;
            const row = Math.floor(i / config.cols);

            // Mirror column position for back pages
            if (!isFrontPage) {
                col = config.cols - 1 - col;
            }

            const x = col * CARD_WITH_BLEED_WIDTH;
            const y = row * CARD_WITH_BLEED_HEIGHT;

            // Get source canvas
            let sourceCanvas = faceCanvas.canvas;

            // Rotate landscape cards to portrait
            if (faceCanvas.isLandscape) {
                sourceCanvas = rotateLandscapeToPortrait(sourceCanvas);
            }

            // Create bleed version
            const bleedCanvas = createBleedCanvas(sourceCanvas, BLEED_PX);

            // Draw card with bleed onto page
            pageCtx.drawImage(bleedCanvas, x, y);

            // Draw crop marks
            drawCropMarks(pageCtx, x, y);
        }

        // Add page to PDF with dimensions converted to points
        pdf.addImage(pageCanvas, "PNG", 0, 0, gridWidth * pxToPt, gridHeight * pxToPt);
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
