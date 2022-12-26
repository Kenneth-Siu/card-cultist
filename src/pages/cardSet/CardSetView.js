import React, { useContext, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignContext } from "../../components/CampaignContext";
import useLoadedImages from "../../helpers/useLoadedImages";
import "./CardSetView.scss";

// TODO can export all cards in set individually with bleed (MPC friendly)
// TODO can export all front/back faces of cards in set with bleed (printer-friendly)

const ttsMaxRows = 7;
const ttsMinRows = 2;
const ttsMaxColumns = 10;
const ttsMinColumns = 2;

export default function CardSet() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();
    const history = useHistory();

    const params = useParams();
    const id = parseInt(params.id);
    const cardSet = campaign.getCardSet(id);

    const ttsFrontCanvas = useRef(null);
    const ttsBackCanvas = useRef(null);

    useEffect(() => {
        loadFileSystemImage(cardSet.symbol);
    }, [cardSet.symbol]);

    if (!cardSet) {
        return (
            <main className="card-set-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-set-page">
            <div className="set-details-container">
                {cardSet.symbol && loadedImages.length > 0 ? loadedImages[loadedImages.length - 1] : ""}
                <input type="text" value={cardSet.title} onChange={(event) => setTitle(event.target.value)} />
                <button onClick={() => setSetSymbol()}>Choose set symbol</button>
            </div>
            <div className="export-container">
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
            </div>
            <button onClick={() => deleteSet()}>Delete Set</button>
        </main>
    );

    function setTitle(title) {
        cardSet.title = title;
        refreshCampaign();
    }

    async function setSetSymbol() {
        const path = await window.fs.chooseIcon();
        cardSet.symbol = path;
        refreshCampaign();
    }

    function deleteSet() {
        campaign.deleteCardSet(id);
        history.push("/");
        refreshCampaign();
    }

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
            if (canvas.classList.contains("landscape")) {
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
