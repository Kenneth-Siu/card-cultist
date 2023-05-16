import React, { useContext, useRef } from "react";
import { CampaignContext } from "../../../components/CampaignContext";
import Container from "../../../components/container/Container";
import "./CardExporter.scss";

const ttsMaxRows = 7;
const ttsMinRows = 2;
const ttsMaxColumns = 10;
const ttsMinColumns = 2;

export default function CardExporter({ cardSet }) {
    const { campaign } = useContext(CampaignContext);
    const ttsCanvas = useRef(null);

    return (
        <Container className="export-container">
            <button onClick={() => exportAllCards("image/png", "png")}>Export all cards (PNG)</button>
            <button onClick={() => exportAllCards("image/jpeg", "jpg", 0.9)}>Export all cards (JPG)</button>
            <button onClick={() => exportForTts()}>Export for TTS (JPG)</button>
            <div className="export-card-front-canvases-container">
                {cardSet.cards.map((card) => card.frontFace.getCanvas(card.id, cardSet, campaign))}
            </div>
            <div className="export-card-back-canvases-container">
                {cardSet.cards.map((card) => card.backFace.getCanvas(card.id, cardSet, campaign))}
            </div>
            <div className="export-tts-container">
                <canvas ref={ttsCanvas} />
            </div>
        </Container>
    );

    function exportAllCards(imageType, extension, quality) {
        document.querySelectorAll(".export-card-front-canvases-container canvas").forEach((canvas, index) => {
            canvas.toBlob(
                (canvasBlob) => {
                    return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                        return window.fs.exportCardImage(
                            campaign.path,
                            cardSet.getTitle(),
                            `${cardSet.cards[index].getTitle()} (Front).${extension}`,
                            new DataView(arrayBuffer)
                        );
                    });
                },
                imageType,
                quality
            );
        });
        document.querySelectorAll(".export-card-back-canvases-container canvas").forEach((canvas, index) => {
            canvas.toBlob(
                (canvasBlob) => {
                    return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                        return window.fs.exportCardImage(
                            campaign.path,
                            cardSet.getTitle(),
                            `${cardSet.cards[index].getTitle()} (Back).${extension}`,
                            new DataView(arrayBuffer)
                        );
                    });
                },
                imageType,
                quality
            );
        });
    }

    async function exportForTts() {
        await exportTtsPortrait();
        await exportTtsLandscape();
    }

    async function exportTtsPortrait() {
        const frontPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-front-canvases-container canvas")
        ).filter((canvas) => {
            if (!canvas) {
                return false;
            }
            return !canvas.classList.contains("landscape");
        });

        await exportForTtsOnce(frontPortraitCanvases, `${cardSet.getTitle()} (Front).jpg`);

        const backPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-back-canvases-container canvas")
        ).filter((canvas) => {
            if (!canvas) {
                return false;
            }
            return !canvas.classList.contains("landscape");
        });

        await exportForTtsOnce(backPortraitCanvases, `${cardSet.getTitle()} (Back).jpg`);
    }

    async function exportTtsLandscape() {
        const frontPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-front-canvases-container canvas")
        ).filter((canvas) => {
            if (!canvas) {
                return false;
            }
            return canvas.classList.contains("landscape");
        });

        await exportForTtsOnce(frontPortraitCanvases, `${cardSet.getTitle()} (Front, Landscape).jpg`);

        const backPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-back-canvases-container canvas")
        ).filter((canvas) => {
            if (!canvas) {
                return false;
            }
            return canvas.classList.contains("landscape");
        });

        await exportForTtsOnce(backPortraitCanvases, `${cardSet.getTitle()} (Back, Landscape).jpg`);
    }

    async function exportForTtsOnce(canvases, exportedImageName) {
        const cardTotal = canvases.length;
        const spacesNeeded = cardTotal + 1; // Bottom-right is saved for card back
        if (spacesNeeded > ttsMaxColumns * ttsMaxRows) {
            // TODO Separate into two
        }
        const numberOfColumns = Math.max(ttsMinColumns, Math.min(cardTotal, ttsMaxColumns));
        const numberOfRows = Math.max(ttsMinRows, Math.floor(spacesNeeded / ttsMaxColumns) + 1);

        ttsCanvas.current.width = 750 * numberOfColumns;
        ttsCanvas.current.height = 1050 * numberOfRows;

        const context = ttsCanvas.current.getContext("2d");
        canvases.forEach((canvas, index) => {
            context.save();
            context.translate((index % ttsMaxColumns) * 750, Math.floor(index / ttsMaxColumns) * 1050);
            if (canvas?.classList.contains("landscape")) {
                context.translate(750, 0);
                context.rotate(Math.PI / 2);
            }
            context.drawImage(canvas, 0, 0);
            context.restore();
        });

        await new Promise((resolve, reject) => {
            ttsCanvas.current.toBlob(
                (canvasBlob) => {
                    canvasBlob
                        .arrayBuffer()
                        .then((arrayBuffer) => {
                            return window.fs.exportCardImage(
                                campaign.path,
                                cardSet.getTitle(),
                                exportedImageName,
                                new DataView(arrayBuffer)
                            );
                        })
                        .then(() => {
                            resolve();
                        })
                        .catch(() => {
                            reject();
                        });
                },
                "image/jpeg",
                0.9
            );
        });
        context.clearRect(0, 0, ttsCanvas.current.width, ttsCanvas.current.height);
    }
}
