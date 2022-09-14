import React from "react";
import { useParams } from "react-router-dom";
import cardFaces from "../../models/cardFaces/cardFaces";
import getCardFaceClassInstance from "../../models/cardFaces/getCardFaceClassInstance";
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
            {card.frontFace.getView(
                <div className="input-container">
                    <label>Card Face</label>
                    <select value={card.frontFace.type} onChange={(event) => setFrontFaceType(event.target.value)}>
                        {cardFaces.map((cardFace) => (
                            <option key={cardFace.type} value={cardFace.type}>
                                {cardFace.type}
                            </option>
                        ))}
                    </select>
                </div>,
                card.frontFace,
                cardSet,
                campaign,
                setCampaign
            )}
            {card.backFace.getView(
                <div className="input-container">
                    <label>Card Face</label>
                    <select value={card.backFace.type} onChange={(event) => setBackFaceType(event.target.value)}>
                        {cardFaces.map((cardFace) => (
                            <option key={cardFace.type} value={cardFace.type}>
                                {cardFace.type}
                            </option>
                        ))}
                    </select>
                </div>,
                card.backFace,
                cardSet,
                campaign,
                setCampaign
            )}
        </main>
    );

    function setFrontFaceType(faceType) {
        card.frontFace.type = faceType;
        card.frontFace = getCardFaceClassInstance(card.frontFace);
        setCampaign(campaign.clone());
    }
    function setBackFaceType(faceType) {
        card.backFace.type = faceType;
        card.backFace = getCardFaceClassInstance(card.backFace);
        setCampaign(campaign.clone());
    }

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
