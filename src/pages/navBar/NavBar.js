import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar({ campaign }) {
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
                    <li>
                        <Link to={`/card-set/${cardSet.id}`}>{cardSet.title}</Link>
                        {cardSet.cards.map((card) => (
                            <ul>
                                <Link to={`/card/${card.id}`}>{card.title}</Link>
                            </ul>
                        ))}
                        <Link to="/card">+ Card</Link>
                    </li>
                ))}
                <li>
                    <Link to="/card-set">+ Set</Link>
                </li>
            </ol>
        </nav>
    );
}
