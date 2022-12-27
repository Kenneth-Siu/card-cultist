import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignContext } from "../../components/CampaignContext";
import Container from "../../components/container/Container";
import IconButton from "../../components/iconButton/IconButton";
import { FACE_DIRECTION } from "./cardConstants";
import listOfCardFaces from "./cardFaces/listOfCardFaces";
import "./CardView.scss";

export default function CardView() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
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
                <label className="num-of-copies">
                    # of copies
                    <input
                        type="number"
                        value={card.numOfCopies}
                        step="1"
                        min="1"
                        onChange={(event) => {
                            card.numOfCopies = parseInt(event.target.value);
                            refreshCampaign();
                        }}
                    />
                </label>
                <div className="buffer" />
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
            {card.frontFace.getView(FACE_DIRECTION.FRONT, listOfCardFaces, card.backFace, cardSet)}
            {card.backFace.getView(FACE_DIRECTION.BACK, listOfCardFaces, card.frontFace, cardSet)}
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
        refreshCampaign();
    }
}
