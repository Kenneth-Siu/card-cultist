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
            <input type="text" value={card.title} onChange={(event) => changeTitle(event.target.value)} />
        </main>
    );

    function changeTitle(title) {
        card.title = title;
        setCampaign(campaign.clone());
    }
}
