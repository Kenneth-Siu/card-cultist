import { jsPDF } from "jspdf";
import {
    PAPER_CONFIGS,
    BLEED_PX,
    CARD_WITH_BLEED_WIDTH,
    CARD_WITH_BLEED_HEIGHT
} from "../../../helpers/pdfExport/pdfExportConfig";
import { CARD_PORTRAIT_WIDTH, CARD_PORTRAIT_HEIGHT } from "../../card/cardConstants";
import createBleedCanvas from "../../../helpers/pdfExport/createBleedCanvas";
import drawCropMarks from "../../../helpers/pdfExport/drawCropMarks";
import collectPrintFaces from "../../../helpers/pdfExport/collectPrintFaces";
import cleanFileName from "../../../helpers/cleanFileName";

/**
 * Rotates a landscape canvas to portrait orientation.
 *
 * @param {HTMLCanvasElement} landscapeCanvas - Canvas with 1050x750 dimensions
 * @returns {HTMLCanvasElement} - Rotated canvas with 750x1050 dimensions
 */
function rotateLandscapeToPortrait(landscapeCanvas) {
    const rotatedCanvas = document.createElement("canvas");
    rotatedCanvas.width = CARD_PORTRAIT_WIDTH;   // 750
    rotatedCanvas.height = CARD_PORTRAIT_HEIGHT; // 1050

    const ctx = rotatedCanvas.getContext("2d");
    ctx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(
        landscapeCanvas,
        -landscapeCanvas.width / 2,
        -landscapeCanvas.height / 2
    );

    return rotatedCanvas;
}

/**
 * Exports a card set to a printable PDF with bleed and crop marks.
 *
 * @param {CardSet} cardSet - The card set to export
 * @param {string} paperSize - "a4" or "letter"
 * @returns {Promise<void>}
 */
export default async function exportPdf(cardSet, paperSize) {
    const config = PAPER_CONFIGS[paperSize];
    if (!config) {
        throw new Error(`Unknown paper size: ${paperSize}`);
    }

    // Collect faces to export
    const facesToExport = collectPrintFaces(cardSet);

    if (facesToExport.length === 0) {
        alert("No cards to export.");
        return;
    }

    // Get canvas elements from the DOM
    // These are rendered in hidden containers by CardExporter
    const frontCanvases = Array.from(
        document.querySelectorAll(".export-card-front-canvases-container canvas")
    );
    const backCanvases = Array.from(
        document.querySelectorAll(".export-card-back-canvases-container canvas")
    );

    // Map faces to their canvas elements
    const faceCanvases = facesToExport.map(({ cardIndex, side }) => {
        const canvas = side === "front"
            ? frontCanvases[cardIndex]
            : backCanvases[cardIndex];
        return {
            canvas,
            isLandscape: canvas?.classList.contains("landscape")
        };
    });

    // Calculate layout
    const cardsPerPage = config.cols * config.rows;
    const gridWidth = config.cols * CARD_WITH_BLEED_WIDTH;
    const gridHeight = config.rows * CARD_WITH_BLEED_HEIGHT;
    const marginX = (config.width - gridWidth) / 2;
    const marginY = (config.height - gridHeight) / 2;

    // Create PDF
    const pdf = new jsPDF({
        unit: "px",
        hotfixes: ["px_scaling"],
        format: [config.width, config.height],
        compress: true
    });

    // Create page canvas for compositing
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = config.width;
    pageCanvas.height = config.height;
    const pageCtx = pageCanvas.getContext("2d");

    // Process each face
    for (let i = 0; i < faceCanvases.length; i++) {
        const posOnPage = i % cardsPerPage;

        // Start new page if needed
        if (posOnPage === 0) {
            if (i > 0) {
                // Add completed page to PDF first
                pdf.addImage(pageCanvas, "PNG", 0, 0);
                pdf.addPage([config.width, config.height]);
            }
            // Clear page canvas
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, config.width, config.height);
        }

        // Calculate position on page
        const col = posOnPage % config.cols;
        const row = Math.floor(posOnPage / config.cols);
        const x = marginX + col * CARD_WITH_BLEED_WIDTH;
        const y = marginY + row * CARD_WITH_BLEED_HEIGHT;

        // Get source canvas
        let sourceCanvas = faceCanvases[i].canvas;

        if (!sourceCanvas) {
            console.warn(`Missing canvas for face ${i}`);
            continue;
        }

        // Rotate landscape cards to portrait
        if (faceCanvases[i].isLandscape) {
            sourceCanvas = rotateLandscapeToPortrait(sourceCanvas);
        }

        // Create bleed version
        const bleedCanvas = createBleedCanvas(sourceCanvas, BLEED_PX);

        // Draw card with bleed onto page
        pageCtx.drawImage(bleedCanvas, x, y);

        // Draw crop marks
        drawCropMarks(pageCtx, x, y);
    }

    // Add final page
    pdf.addImage(pageCanvas, "PNG", 0, 0);

    // Save PDF
    const fileName = `${cleanFileName(cardSet.getTitle())}_print.pdf`;
    pdf.save(fileName);
}
