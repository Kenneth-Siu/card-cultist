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
    const ttsFrontCanvas = useRef(null);
    const ttsBackCanvas = useRef(null);

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
                <canvas ref={ttsFrontCanvas} />
                <canvas ref={ttsBackCanvas} />
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

    function exportForTts() {
        const cardTotal = cardSet.cards.length;
        const spacesNeeded = cardTotal + 1; // Bottom-right is saved for card back
        if (spacesNeeded > ttsMaxColumns * ttsMaxRows) {
            // TODO Separate into two
        }
        const numberOfColumns = Math.max(ttsMinColumns, Math.min(cardTotal, ttsMaxColumns));
        const numberOfRows = Math.max(ttsMinRows, Math.floor(spacesNeeded / ttsMaxColumns) + 1);

        ttsFrontCanvas.current.width = 750 * numberOfColumns;
        ttsFrontCanvas.current.height = 1050 * numberOfRows;

        const frontContext = ttsFrontCanvas.current.getContext("2d");
        document.querySelectorAll(".export-card-front-canvases-container canvas").forEach((canvas, index) => {
            frontContext.save();
            frontContext.translate((index % ttsMaxColumns) * 750, Math.floor(index / ttsMaxColumns) * 1050);
            if (canvas?.classList.contains("landscape")) {
                frontContext.translate(750, 0);
                frontContext.rotate(Math.PI / 2);
            }
            frontContext.drawImage(canvas, 0, 0);
            frontContext.restore();
        });
        ttsFrontCanvas.current.toBlob(
            (canvasBlob) => {
                return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                    return window.fs.exportCardImage(
                        campaign.path,
                        cardSet.getTitle(),
                        `${cardSet.getTitle()} (Front).jpg`,
                        new DataView(arrayBuffer)
                    );
                });
            },
            "image/jpeg",
            0.9
        );

        ttsBackCanvas.current.width = 750 * numberOfColumns;
        ttsBackCanvas.current.height = 1050 * numberOfRows;

        const backContext = ttsBackCanvas.current.getContext("2d");
        document.querySelectorAll(".export-card-back-canvases-container canvas").forEach((canvas, index) => {
            backContext.drawImage(canvas, (index % ttsMaxColumns) * 750, Math.floor(index / ttsMaxColumns) * 1050);
        });
        ttsBackCanvas.current.toBlob(
            (canvasBlob) => {
                return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                    return window.fs.exportCardImage(
                        campaign.path,
                        cardSet.getTitle(),
                        `${cardSet.getTitle()} (Back).jpg`,
                        new DataView(arrayBuffer)
                    );
                });
            },
            "image/jpeg",
            0.9
        );
    }
}
