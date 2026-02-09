import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CampaignContext } from "../../components/CampaignContext";
import Container from "../../components/container/Container";
import exportPdfToFile from "../cardSet/components/exportPdfToFile";
import collectPrintFaces from "../../helpers/pdfExport/collectPrintFaces";
import { PAPER_CONFIGS } from "../../helpers/pdfExport/pdfExportConfig";
import "./CampaignExportPage.scss";

/**
 * Dedicated page for exporting all card sets to PDF.
 * Renders all canvases and waits for images to load before allowing export.
 */
export default function CampaignExportPage() {
    const { campaign } = useContext(CampaignContext);
    const history = useHistory();
    const [paperSize, setPaperSize] = useState("a4");
    const [exporting, setExporting] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [currentSetTitle, setCurrentSetTitle] = useState("");

    // Get card sets that have cards to export
    const cardSetsToExport = campaign.cardSets.filter(cardSet => {
        const faces = collectPrintFaces(cardSet);
        return faces.length > 0;
    });

    // Check if all images are loaded
    useEffect(() => {
        if (cardSetsToExport.length === 0) {
            setImagesLoaded(true);
            return;
        }

        const checkImagesLoaded = () => {
            const allCanvases = document.querySelectorAll(".campaign-export-canvas-container canvas");

            if (allCanvases.length === 0) {
                // Canvases not rendered yet
                setTimeout(checkImagesLoaded, 100);
                return;
            }

            // Check each canvas has content
            let allReady = true;
            for (let canvas of allCanvases) {
                const ctx = canvas.getContext("2d");
                const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));

                // Check for any rendered content
                let hasContent = false;
                for (let i = 3; i < imageData.data.length; i += 4) {
                    if (imageData.data[i] > 0) {
                        hasContent = true;
                        break;
                    }
                }

                if (!hasContent) {
                    allReady = false;
                    break;
                }
            }

            if (allReady) {
                setImagesLoaded(true);
            } else {
                setTimeout(checkImagesLoaded, 200);
            }
        };

        // Start checking after a short delay to let React render
        setTimeout(checkImagesLoaded, 500);
    }, [cardSetsToExport.length]);

    async function handleExport() {
        setExporting(true);
        setProgress({ current: 0, total: cardSetsToExport.length });

        const results = { success: 0, failed: 0 };
        const subfolder = `print-and-play-${paperSize}`;

        for (let i = 0; i < cardSetsToExport.length; i++) {
            const cardSet = cardSetsToExport[i];
            setCurrentSetTitle(cardSet.getTitle());
            setProgress({ current: i + 1, total: cardSetsToExport.length });

            try {
                // Export to PDF with scoped canvas query
                await exportPdfToFile(cardSet, paperSize, campaign.path, subfolder, cardSet.id);
                results.success++;
            } catch (error) {
                console.error(`Failed to export ${cardSet.getTitle()}:`, error);
                results.failed++;
            }

            await delay(100);
        }

        setExporting(false);

        // Show results
        const folderName = `print-and-play-${paperSize}`;
        if (results.failed === 0 && results.success > 0) {
            alert(`Exported ${results.success} PDF${results.success > 1 ? 's' : ''} successfully!\n\nSaved to: Exports/${folderName}/`);
        } else if (results.success > 0) {
            alert(`Exported ${results.success} of ${results.success + results.failed} PDFs (${results.failed} failed - see console)\n\nSaved to: Exports/${folderName}/`);
        } else {
            alert("Export failed - see console for details");
        }

        // Navigate back to campaign view
        history.push("/");
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (!campaign) {
        return <div>No campaign loaded</div>;
    }

    return (
        <main className="campaign-export-page">
            <Container>
                <h2>Export All Card Sets to PDF</h2>

                <div className="export-controls">
                    <button onClick={() => history.push("/")}>← Back to Campaign</button>

                    <div className="paper-size-selector">
                        <label>Paper Size: </label>
                        <select
                            value={paperSize}
                            onChange={(e) => setPaperSize(e.target.value)}
                            disabled={exporting}
                        >
                            {Object.entries(PAPER_CONFIGS).map(([key, config]) => (
                                <option key={key} value={key}>
                                    {config.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {imagesLoaded ? (
                        <button
                            onClick={handleExport}
                            disabled={exporting || cardSetsToExport.length === 0}
                            className="export-button"
                        >
                            {exporting ? "Exporting..." : `Export ${cardSetsToExport.length} Card Set${cardSetsToExport.length !== 1 ? 's' : ''}`}
                        </button>
                    ) : (
                        <div className="loading-message">Loading images... Please wait.</div>
                    )}
                </div>

                {exporting && (
                    <div className="progress-info">
                        <p>Exporting set {progress.current} of {progress.total}</p>
                        <p>{currentSetTitle}</p>
                    </div>
                )}

                <div className="card-sets-info">
                    <h3>Card Sets to Export:</h3>
                    <ul>
                        {cardSetsToExport.map(cardSet => (
                            <li key={cardSet.id}>
                                {cardSet.getTitle()} ({cardSet.cards.length} cards)
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>

            {/* Hidden canvas rendering area */}
            <div className="campaign-export-canvas-container" style={{ position: "absolute", left: "-9999px", top: 0 }}>
                {cardSetsToExport.map(cardSet => (
                    <div key={cardSet.id} data-cardset-id={cardSet.id}>
                        <div className="export-card-front-canvases-container">
                            {cardSet.cards.map((card) => card.frontFace.getCanvas(card.id, cardSet, campaign))}
                        </div>
                        <div className="export-card-back-canvases-container">
                            {cardSet.cards.map((card) => card.backFace.getCanvas(card.id, cardSet, campaign))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
