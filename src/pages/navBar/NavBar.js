import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar({ campaign, setCampaign }) {
    const history = useHistory();

    return (
        <nav id="nav-bar">
            <ol>
                <li>
                    <Link to="/">{campaign.title}</Link>
                </li>
                <li>
                    <Link to="/campaign-guide">Campaign Guide</Link>
                </li>
                {campaign.cardSets.map((cardSet) => (
                    <li key={cardSet.id}>
                        <Link to={`/card-set/${cardSet.id}`}>
                            {cardSet.title ? cardSet.title : `(No title – ID ${cardSet.id})`}
                        </Link>
                        <ul>
                            {cardSet.cards.map((card) => (
                                <li key={card.id}>
                                    <Link to={`/card-set/${cardSet.id}/card/${card.id}`}>
                                        {card.title ? card.title : `(No title – ID ${card.id})`}
                                    </Link>
                                </li>
                            ))}
                            <a href="#" onClick={() => addCard(cardSet)}>
                                + Card
                            </a>
                        </ul>
                    </li>
                ))}
                <li>
                    <a href="#" onClick={() => addCardSet()}>
                        + Set
                    </a>
                </li>
            </ol>
        </nav>
    );

    function addCard(cardSet) {
        const cardId = cardSet.addCard();
        setCampaign(campaign.clone());
        history.push(`/card-set/${cardSet.id}/card/${cardId}`);
    }

    function addCardSet() {
        const cardSetId = campaign.addCardSet();
        setCampaign(campaign.clone());
        history.push(`/card-set/${cardSetId}`);
    }
}
