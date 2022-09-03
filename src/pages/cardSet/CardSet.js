import React from "react";
import { useParams } from "react-router-dom";
import "./CardSet.scss";

export default function CardSet({ campaign, setCampaign }) {
    const params = useParams();
    const id = parseInt(params.id);
    const cardSet = campaign.getCardSet(id);

    if (!cardSet) {
        return (
            <main className="card-set-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-set-page">
            <input type="text" value={cardSet.title} onChange={(event) => changeTitle(event.target.value)} />
        </main>
    );

    function changeTitle(title) {
        cardSet.title = title;
        setCampaign(campaign.clone());
    }
}
