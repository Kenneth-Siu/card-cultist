import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CampaignContext } from "../../components/CampaignContext";
import Container from "../../components/container/Container";
import exportPdfToFile from "../cardSet/components/exportPdfToFile";
import exportPdfNoCropToFile from "../cardSet/components/exportPdfNoCropToFile";
import collectPrintFaces from "../../helpers/pdfExport/collectPrintFaces";
import { PAPER_CONFIGS, BLEED_PX } from "../../helpers/pdfExport/pdfExportConfig";
import createBleedCanvas from "../../helpers/pdfExport/createBleedCanvas";
import rotateLandscapeToPortrait from "../../helpers/pdfExport/rotateLandscapeToPortrait";
import cleanFileName from "../../helpers/cleanFileName";
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

    async function handleExportNoCrop() {
        setExporting(true);
        setProgress({ current: 0, total: cardSetsToExport.length });

        const results = { success: 0, failed: 0 };
        const subfolder = "print-and-play-no-crop";

        for (let i = 0; i < cardSetsToExport.length; i++) {
            const cardSet = cardSetsToExport[i];
            setCurrentSetTitle(cardSet.getTitle());
            setProgress({ current: i + 1, total: cardSetsToExport.length });

            try {
                // Export to PDF with scoped canvas query
                await exportPdfNoCropToFile(cardSet, campaign.path, subfolder, cardSet.id);
                results.success++;
            } catch (error) {
                console.error(`Failed to export ${cardSet.getTitle()}:`, error);
                results.failed++;
            }

            await delay(100);
        }

        setExporting(false);

        // Show results
        if (results.failed === 0 && results.success > 0) {
            alert(`Exported ${results.success} PDF${results.success > 1 ? 's' : ''} successfully!\n\nSaved to: Exports/${subfolder}/`);
        } else if (results.success > 0) {
            alert(`Exported ${results.success} of ${results.success + results.failed} PDFs (${results.failed} failed - see console)\n\nSaved to: Exports/${subfolder}/`);
        } else {
            alert("Export failed - see console for details");
        }

        // Navigate back to campaign view
        history.push("/");
    }

    async function handleExportBleed() {
        setExporting(true);
        setProgress({ current: 0, total: cardSetsToExport.length });

        const results = { success: 0, failed: 0, totalCards: 0 };
        const subfolder = "bleed";

        for (let i = 0; i < cardSetsToExport.length; i++) {
            const cardSet = cardSetsToExport[i];
            setCurrentSetTitle(cardSet.getTitle());
            setProgress({ current: i + 1, total: cardSetsToExport.length });

            try {
                // Query canvases scoped to this card set
                const frontCanvases = document.querySelectorAll(
                    `[data-cardset-id="${cardSet.id}"] .export-card-front-canvases-container canvas`
                );
                const backCanvases = document.querySelectorAll(
                    `[data-cardset-id="${cardSet.id}"] .export-card-back-canvases-container canvas`
                );

                // Export front faces
                for (let index = 0; index < frontCanvases.length; index++) {
                    const canvas = frontCanvases[index];
                    const card = cardSet.cards[index];
                    const numOfCopies = card.numOfCopies || 1;
                    const cardSetId = card.frontFace.campaignSetId || card.frontFace.encounterSetId || cardSet.id;

                    let sourceCanvas = canvas;
                    if (canvas.classList.contains("landscape")) {
                        sourceCanvas = rotateLandscapeToPortrait(canvas);
                    }
                    const bleedCanvas = createBleedCanvas(sourceCanvas, BLEED_PX);

                    // Export a copy for each numOfCopies
                    for (let copyNum = 1; copyNum <= numOfCopies; copyNum++) {
                        await new Promise((resolve, reject) => {
                            bleedCanvas.toBlob(
                                (canvasBlob) => {
                                    canvasBlob.arrayBuffer().then((arrayBuffer) => {
                                        const fileName = numOfCopies > 1
                                            ? `${cardSetId}-${cleanFileName(card.getTitle())}-${copyNum} (Front).png`
                                            : `${cardSetId}-${cleanFileName(card.getTitle())} (Front).png`;
                                        return window.fs.exportFile(
                                            campaign.path,
                                            subfolder,
                                            fileName,
                                            new DataView(arrayBuffer)
                                        );
                                    }).then(resolve).catch(reject);
                                },
                                "image/png"
                            );
                        });
                    }
                }

                // Export back faces
                for (let index = 0; index < backCanvases.length; index++) {
                    const canvas = backCanvases[index];
                    const card = cardSet.cards[index];
                    const numOfCopies = card.numOfCopies || 1;
                    const cardSetId = card.backFace.campaignSetId || card.backFace.encounterSetId || cardSet.id;

                    let sourceCanvas = canvas;
                    if (canvas.classList.contains("landscape")) {
                        sourceCanvas = rotateLandscapeToPortrait(canvas);
                    }
                    const bleedCanvas = createBleedCanvas(sourceCanvas, BLEED_PX);

                    // Export a copy for each numOfCopies
                    for (let copyNum = 1; copyNum <= numOfCopies; copyNum++) {
                        await new Promise((resolve, reject) => {
                            bleedCanvas.toBlob(
                                (canvasBlob) => {
                                    canvasBlob.arrayBuffer().then((arrayBuffer) => {
                                        const fileName = numOfCopies > 1
                                            ? `${cardSetId}-${cleanFileName(card.getTitle())}-${copyNum} (Back).png`
                                            : `${cardSetId}-${cleanFileName(card.getTitle())} (Back).png`;
                                        return window.fs.exportFile(
                                            campaign.path,
                                            subfolder,
                                            fileName,
                                            new DataView(arrayBuffer)
                                        );
                                    }).then(resolve).catch(reject);
                                },
                                "image/png"
                            );
                        });
                    }
                }

                results.success++;
                results.totalCards += cardSet.cards.length;
            } catch (error) {
                console.error(`Failed to export ${cardSet.getTitle()}:`, error);
                results.failed++;
            }

            await delay(100);
        }

        setExporting(false);

        // Show results
        if (results.failed === 0 && results.success > 0) {
            alert(`Exported ${results.totalCards} cards from ${results.success} card set${results.success > 1 ? 's' : ''} successfully!\n\nSaved to: Exports/${subfolder}/`);
        } else if (results.success > 0) {
            alert(`Exported ${results.success} of ${results.success + results.failed} card sets (${results.failed} failed - see console)\n\nSaved to: Exports/${subfolder}/`);
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
                        <>
                            <button
                                onClick={handleExport}
                                disabled={exporting || cardSetsToExport.length === 0}
                                className="export-button"
                            >
                                {exporting ? "Exporting..." : `Export ${cardSetsToExport.length} Card Set${cardSetsToExport.length !== 1 ? 's' : ''}`}
                            </button>
                            <button
                                onClick={handleExportNoCrop}
                                disabled={exporting || cardSetsToExport.length === 0}
                                className="export-button"
                            >
                                {exporting ? "Exporting..." : `Export ${cardSetsToExport.length} Card Set${cardSetsToExport.length !== 1 ? 's' : ''} (No Crop)`}
                            </button>
                            <button
                                onClick={handleExportBleed}
                                disabled={exporting || cardSetsToExport.length === 0}
                                className="export-button"
                            >
                                {exporting ? "Exporting..." : `Export All Cards with Bleed (PNG)`}
                            </button>
                        </>
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
