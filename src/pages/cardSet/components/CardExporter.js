import React, { useContext, useRef } from "react";
import { CampaignContext } from "../../../components/CampaignContext";
import Container from "../../../components/container/Container";
import "./CardExporter.scss";
import getTtsSaveObject from "./GetTtsSaveObject";
import { getTtsDimensions, ttsMaxColumns } from "./TtsHelperFunctions";

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
                        return window.fs.exportFile(
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
                        return window.fs.exportFile(
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
        )
            .map((canvas, index) => {
                canvas.cardIndex = index;
                return canvas;
            })
            .filter((canvas) => {
                if (!canvas) {
                    return false;
                }
                return !canvas.classList.contains("landscape");
            });

        if (frontPortraitCanvases.length > 0) {
            await exportForTtsOnce(frontPortraitCanvases, `${cardSet.getTitle()} (Front).jpg`);
        }

        const backPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-back-canvases-container canvas")
        )
            .map((canvas, index) => {
                canvas.cardIndex = index;
                return canvas;
            })
            .filter((canvas) => {
                if (!canvas) {
                    return false;
                }
                return !canvas.classList.contains("landscape");
            });

        if (backPortraitCanvases.length > 0) {
            await exportForTtsOnce(backPortraitCanvases, `${cardSet.getTitle()} (Back).jpg`);
        }

        if (frontPortraitCanvases.length > 0) {
            window.fs.exportTtsSaveObject(
                campaign.path,
                `${cardSet.getTitle()}.json`,
                getTtsSaveObject(campaign.path, cardSet, frontPortraitCanvases.map(o => o.cardIndex), `${cardSet.getTitle()} (Front).jpg`, `${cardSet.getTitle()} (Back).jpg`)
            );
        }
    }

    async function exportTtsLandscape() {
        const frontPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-front-canvases-container canvas")
        )
            .map((canvas, index) => {
                canvas.cardIndex = index;
                return canvas;
            })
            .filter((canvas) => {
                if (!canvas) {
                    return false;
                }
                return canvas.classList.contains("landscape");
            });

        if (frontPortraitCanvases.length > 0) {
            await exportForTtsOnce(frontPortraitCanvases, `${cardSet.getTitle()} (Front, Landscape).jpg`);
        }

        const backPortraitCanvases = Array.from(
            document.querySelectorAll(".export-card-back-canvases-container canvas")
        )
            .map((canvas, index) => {
                canvas.cardIndex = index;
                return canvas;
            })
            .filter((canvas) => {
                if (!canvas) {
                    return false;
                }
                return canvas.classList.contains("landscape");
            });

        if (backPortraitCanvases.length > 0) {
            await exportForTtsOnce(backPortraitCanvases, `${cardSet.getTitle()} (Back, Landscape).jpg`);
        }

        if (frontPortraitCanvases.length > 0) {
            window.fs.exportTtsSaveObject(
                campaign.path,
                `${cardSet.getTitle()} (Landscape).json`,
                getTtsSaveObject(campaign.path, cardSet, frontPortraitCanvases.map(o => o.cardIndex), `${cardSet.getTitle()} (Front, Landscape).jpg`, `${cardSet.getTitle()} (Back, Landscape).jpg`, true)
            );
        }
    }

    async function exportForTtsOnce(canvases, exportedImageName) {
        const [numberOfColumns, numberOfRows] = getTtsDimensions(canvases.length);

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
                            return window.fs.exportFile(
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
