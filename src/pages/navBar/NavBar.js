import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import hash from "../../helpers/hash";
import { getImageSrc } from "../../helpers/useLoadedImages";
import "./NavBar.scss";

export default function NavBar({ campaign, setCampaign }) {
    const history = useHistory();
    const [campaignSymbolSrc, setCampaignSymbolSrc] = useState(null);
    const [cardSetSymbolSrcs, setCardSetSymbolSrcs] = useState({});
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [copiedCard, setCopiedCard] = useState(null);
    const [deselected, setDeselected] = useState(true);

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

    useEffect(() => {
        function clickCallback(event) {
            if (
                !(event.target.classList.contains("selectable") && event.target.classList.contains("nav-link")) &&
                !(
                    event.target.parentElement.classList.contains("selectable") &&
                    event.target.parentElement.classList.contains("nav-link")
                )
            ) {
                setSelectedEntity(null);

                if (
                    !event.target.classList.contains("nav-link") &&
                    !event.target.parentElement.classList.contains("nav-link")
                ) {
                    setDeselected(true);
                }
            }
        }
        function keyboardCallback(event) {
            if (selectedEntity?.cardId && (event.metaKey || event.ctrlKey) && event.code === "KeyC") {
                setCopiedCard(selectedEntity);
            }
            if (copiedCard && selectedEntity && (event.metaKey || event.ctrlKey) && event.code === "KeyV") {
                const cardToAdd = campaign.cardSets
                    .find((cardSet) => cardSet.id === copiedCard.cardSetId)
                    ?.cards.find((card) => card.id === copiedCard.cardId);
                if (cardToAdd) {
                    campaign.cardSets.find((cardSet) => cardSet.id === selectedEntity.cardSetId)?.addCard(cardToAdd);
                    setCampaign(campaign.clone());
                }
            }
        }

        if (selectedEntity) {
            document.addEventListener("click", clickCallback, { once: true, passive: true });
            document.addEventListener("keydown", keyboardCallback);
            setDeselected(false);
        }

        return () => {
            document.removeEventListener("click", clickCallback);
            document.removeEventListener("keydown", keyboardCallback);
        };
    }, [selectedEntity, copiedCard]);

    return (
        <nav id="nav-bar">
            <ol>
                <li>
                    <NavLink
                        exact
                        to="/"
                        activeClassName={`active ${deselected ? "deselected" : ""}`}
                        className="nav-link"
                        onClick={() => setDeselected(false)}
                    >
                        <img src={campaignSymbolSrc} />
                        {campaign.title}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        exact
                        to="/campaign-guide"
                        activeClassName={`active ${deselected ? "deselected" : ""}`}
                        className="nav-link"
                        onClick={() => setDeselected(false)}
                    >
                        <span className="emoji">✒</span>
                        <span>Campaign Guide</span>
                    </NavLink>
                </li>
                {campaign.cardSets.map((cardSet) => (
                    <li key={cardSet.id}>
                        <NavLink
                            exact
                            to={`/card-set/${cardSet.id}`}
                            activeClassName={`active ${deselected ? "deselected" : ""}`}
                            className={`nav-link selectable ${
                                selectedEntity?.cardSetId === cardSet.id && !selectedEntity?.cardId ? "selected" : ""
                            }`}
                            onClick={() => setSelectedEntity({ cardSetId: cardSet.id })}
                        >
                            <img src={cardSetSymbolSrcs[cardSet.id]} />
                            {cardSet.getTitle()}
                        </NavLink>
                        <ol>
                            {cardSet.cards.map((card) => (
                                <li key={card.id}>
                                    <NavLink
                                        exact
                                        to={`/card-set/${cardSet.id}/card/${card.id}`}
                                        activeClassName={`active ${deselected ? "deselected" : ""}`}
                                        className={`nav-link selectable ${
                                            selectedEntity?.cardSetId === cardSet.id &&
                                            selectedEntity?.cardId === card.id
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => setSelectedEntity({ cardSetId: cardSet.id, cardId: card.id })}
                                    >
                                        <span className="emoji">{`${card.getEmoji()}`}</span>
                                        <span>{`${card.getTitle()}`}</span>
                                    </NavLink>
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
