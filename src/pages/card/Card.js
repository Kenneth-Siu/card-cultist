import React from "react";
import { useParams } from "react-router-dom";
import "./Card.scss";

export default function Card({ campaign, setCampaign }) {
    const params = useParams();

    const id = parseInt(params.id);
    const cardSetId = parseInt(params.cardSetId);

    const cardSet = campaign.getCardSet(cardSetId);
    const card = cardSet.getCard(id);

    if (!card) {
        return (
            <main className="card-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-page">
            {card.frontFace ? card.frontFace.getView(card.frontFace, campaign, setCampaign) : <div>Pick a face</div>}
            {card.backFace ? card.backFace.getView(card.backFace, campaign, setCampaign) : <div>Pick a face</div>}

            <div>
                <button onClick={() => downloadOne()}>Download one</button>
                <button onClick={() => downloadAll()}>Download all</button>
            </div>
        </main>
    );

    function downloadOne() {
        canvas.current.toBlob((canvasBlob) => {
            saveAs(canvasBlob, "Rotting Remains.png");
        });
    }

    function downloadAll() {
        const zip = new JSZip();
        const strikingFear = zip.folder("Striking Fear");
        const promise1 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        const promise2 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
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
