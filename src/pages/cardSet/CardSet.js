import JSZip from "jszip";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLoadedImages from "../../helpers/useLoadedImages";
import "./CardSet.scss";

// TODO can export all cards in set individually
// TODO can export all front/back faces of cards in set in a TTS-friendly format
// TODO can export all cards in set individually with bleed (MPC friendly)
// TODO can export all front/back faces of cards in set with bleed (printer-friendly)

export default function CardSet({ campaign, setCampaign }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const params = useParams();
    const id = parseInt(params.id);
    const cardSet = campaign.getCardSet(id);

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
                <button>Export all cards</button>
            </div>
        </main>
    );

    function setTitle(title) {
        cardSet.title = title;
        setCampaign(campaign.clone());
    }

    // TODO doesn't work with SVGs
    async function setSetSymbol() {
        const path = await window.fs.chooseIcon();
        cardSet.symbol = path;
        setCampaign(campaign.clone());
    }

    function exportAllCards() {

    }

    function downloadAll() {
        const zip = new JSZip();
        const strikingFear = zip.folder("Striking Fear");
        const promise1 = new Promise((resolve, reject) => {
            canvasRef.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        const promise2 = new Promise((resolve, reject) => {
            canvasRef.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        Promise.all([promise1, promise2]).then(([canvasBlob1, canvasBlob2]) => {
            strikingFear.file("Rotting Remains.png", canvasBlob1);
            strikingFear.file("Rotting Remains2.png", canvasBlob2);
            zip.generateAsync({ type: "blob" }).then((zipBlob) => {
                saveAs(zipBlob, "Darkham Horror.zip");
            });
        });
    }
}
