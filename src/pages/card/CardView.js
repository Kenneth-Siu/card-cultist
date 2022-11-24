import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import IconButton from "../../components/iconButton/IconButton";
import { FACE_DIRECTION } from "./cardConstants";
import listOfCardFaces from "./cardFaces/listOfCardFaces";
import "./CardView.scss";

export default function CardView({ campaign, setCampaign }) {
    const params = useParams();

    const id = parseInt(params.id);
    const cardSetId = parseInt(params.cardSetId);

    const cardSet = campaign.getCardSet(cardSetId);
    const card = cardSet.getCard(id);

    const history = useHistory();

    if (!card) {
        return (
            <main className="card-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-page">
            <Container className="toolbar">
                <IconButton onClick={() => exportCard("image/png", "png")}>
                    <span className="emoji">💾</span> Export PNG
                </IconButton>
                <IconButton onClick={() => exportCard("image/jpeg", "jpg", 0.9)}>
                    <span className="emoji">💾</span> Export JPG
                </IconButton>
                <IconButton onClick={() => deleteCard()}>
                    <span className="emoji">🗑</span> Delete
                </IconButton>
            </Container>
            {card.frontFace.getView(FACE_DIRECTION.FRONT, listOfCardFaces, card.backFace, cardSet, campaign, setCampaign)}
            {card.backFace.getView(FACE_DIRECTION.BACK, listOfCardFaces, card.frontFace, cardSet, campaign, setCampaign)}
        </main>
    );

    function exportCard(imageType, extension, quality) {
        document.querySelector(".face-view:nth-child(2) canvas").toBlob(
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
        document.querySelector(".face-view:nth-child(3) canvas").toBlob(
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

    function deleteCard() {
        cardSet.deleteCard(id);
        history.push(`/card-set/${cardSetId}`);
        setCampaign(campaign.clone());
    }
}
