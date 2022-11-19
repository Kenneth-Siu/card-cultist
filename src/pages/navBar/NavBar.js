import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import hash from "../../helpers/hash";
import { getImageSrc } from "../../helpers/useLoadedImages";
import "./NavBar.scss";

export default function NavBar({ campaign, setCampaign }) {
    const history = useHistory();
    const [campaignSymbolSrc, setCampaignSymbolSrc] = useState(null);
    const [cardSetSymbolSrcs, setCardSetSymbolSrcs] = useState({});

    useEffect(() => {
        (async () => {
            if (campaign.symbol) {
                setCampaignSymbolSrc(await getImageSrc(campaign.symbol));
            }
        })();
    }, [campaign.symbol]);

    useEffect(() => {
        (async () => {
            const symbols = Object.assign({}, cardSetSymbolSrcs);
            await Promise.all(
                campaign.cardSets.map(async (cardSet) => {
                    if (cardSet.symbol) {
                        symbols[cardSet.id] = await getImageSrc(cardSet.symbol);
                    }
                })
            );
            setCardSetSymbolSrcs(symbols);
        })();
    }, [hash(campaign.cardSets.map((cardSet) => cardSet.symbol))]);

    return (
        <nav id="nav-bar">
            <ol>
                <li>
                    <Link to="/">
                        <img src={campaignSymbolSrc} />
                        {campaign.title}
                    </Link>
                </li>
                <li>
                    <Link to="/campaign-guide">
                        <span className="emoji">✒</span>
                        <span>Campaign Guide</span>
                    </Link>
                </li>
                {campaign.cardSets.map((cardSet) => (
                    <li key={cardSet.id}>
                        <Link to={`/card-set/${cardSet.id}`}>
                            <img src={cardSetSymbolSrcs[cardSet.id]} />
                            {cardSet.getTitle()}
                        </Link>
                        <ol>
                            {cardSet.cards.map((card) => (
                                <li key={card.id}>
                                    <Link to={`/card-set/${cardSet.id}/card/${card.id}`}>
                                        <span className="emoji">{`${card.getEmoji()}`}</span>
                                        <span>{`${card.getTitle()}`}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a href="#" onClick={() => addCard(cardSet)}>
                                    + Card
                                </a>
                            </li>
                        </ol>
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
