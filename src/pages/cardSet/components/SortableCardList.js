import React from "react";
import "./SortableCardList.scss";

export default function SortableCardList({ cardSet }) {
    return (
        <div className="sortable-card-list-container">
            <button>Auto-order WIP</button>
            <button>Generate encounter set card numbers WIP</button>
            <table>
                <tbody>
                    {cardSet.cards.map((card) => (
                        <tr key={card.id}>
                            <td>{card.getTitle()}</td>
                            <td>
                                <span className="emoji">{card.getEmoji()}</span> {card.frontFace.type}
                            </td>
                            <td>
                                {card.frontFace.encounterSetId || card.frontFace.encounterSetMaxId
                                    ? card.frontFace.encounterSetId +
                                      String.fromCharCode(8202) +
                                      "/" +
                                      String.fromCharCode(8202) +
                                      card.frontFace.encounterSetMaxId
                                    : ""}{" "}
                                {hasInconsistentEncounterSetIds(card) && (
                                    <span
                                        className="emoji"
                                        title="Front and back faces have different encounter set card numbers"
                                    >
                                        ⚠
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function hasInconsistentEncounterSetIds(card) {
    return (
        (card.frontFace.encounterSetId &&
            card.backFace.encounterSetId &&
            card.frontFace.encounterSetId !== card.backFace.encounterSetId) ||
        (card.frontFace.encounterSetMaxId &&
            card.backFace.encounterSetMaxId &&
            card.frontFace.encounterSetMaxId !== card.backFace.encounterSetMaxId)
    );
}
