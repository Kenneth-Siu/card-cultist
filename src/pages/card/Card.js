import React from "react";
import { useParams } from "react-router-dom";
import getCardFaceClassInstance from "../../helpers/getCardFaceClassInstance";
import listOfCardFaces from "./cardFaces/listOfCardFaces";
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
            <div>
                <button onClick={() => exportCard("image/png", "png")}>Export PNG</button>
                <button onClick={() => exportCard("image/jpeg", "jpg", 0.9)}>Export JPG</button>
            </div>
            <div className="front-face-view-container">
                {card.frontFace.getView(
                    <div className="input-container">
                        <label>Card Face</label>
                        <select value={card.frontFace.type} onChange={(event) => setFrontFaceType(event.target.value)}>
                            {listOfCardFaces.map((cardFace) => (
                                <option key={cardFace.type} value={cardFace.type}>
                                    {cardFace.type}
                                </option>
                            ))}
                        </select>
                    </div>,
                    cardSet,
                    campaign,
                    setCampaign
                )}
            </div>
            <div className="back-face-view-container">
                {card.backFace.getView(
                    <div className="input-container">
                        <label>Card Face</label>
                        <select value={card.backFace.type} onChange={(event) => setBackFaceType(event.target.value)}>
                            {listOfCardFaces.map((cardFace) => (
                                <option key={cardFace.type} value={cardFace.type}>
                                    {cardFace.type}
                                </option>
                            ))}
                        </select>
                    </div>,
                    cardSet,
                    campaign,
                    setCampaign
                )}
            </div>
        </main>
    );

    function setFrontFaceType(faceType) {
        card.frontFace.type = faceType;
        card.frontFace.cardType = faceType;
        card.frontFace = getCardFaceClassInstance(card.frontFace);
        setCampaign(campaign.clone());
    }
    function setBackFaceType(faceType) {
        card.backFace.type = faceType;
        card.backFace.cardType = faceType;
        card.backFace = getCardFaceClassInstance(card.backFace);
        setCampaign(campaign.clone());
    }

    function exportCard(imageType, extension, quality) {
        document.querySelector(".front-face-view-container canvas").toBlob(
            (canvasBlob) => {
                return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                    return window.fs.exportCardImage(
                        campaign.path,
                        cardSet.getTitle(),
                        `${card.getTitle()} (Front).${extension}`,
                        new DataView(arrayBuffer)
                    );
                });
            },
            imageType,
            quality
        );
        document.querySelector(".back-face-view-container canvas").toBlob(
            (canvasBlob) => {
                return canvasBlob.arrayBuffer().then((arrayBuffer) => {
                    return window.fs.exportCardImage(
                        campaign.path,
                        cardSet.getTitle(),
                        `${card.getTitle()} (Back).${extension}`,
                        new DataView(arrayBuffer)
                    );
                });
            },
            imageType,
            quality
        );
    }
}
