import React, { useContext } from "react";
import { CampaignContext } from "../../../components/CampaignContext";
import DragIndicator from "@mui/icons-material/DragIndicator";
import Container from "../../../components/container/Container";
import "./SortableCardList.scss";

export default function SortableCardList({ cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <Container className="sortable-card-list-container">
            <button onClick={orderCardSet}>Order cards by type</button>
            <button onClick={generateEncounterSetCardNumbers}>Generate encounter set card numbers</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Type</th>
                        <th># of copies</th>
                        <th>Encounter set card number</th>
                    </tr>
                </thead>
                <tbody>
                    {cardSet.cards.map((card) => (
                        <tr key={card.id}>
                            <td className="drag-indicator">
                                <DragIndicator />
                            </td>
                            <td>{card.getTitle()}</td>
                            <td>
                                <span className="emoji">{card.getEmoji()}</span> {card.frontFace.type}
                            </td>
                            <td>{card.numOfCopies}</td>
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
        </Container>
    );

    function orderCardSet() {
        cardSet.orderCards();
        refreshCampaign();
    }

    function generateEncounterSetCardNumbers() {
        cardSet.generateEncounterSetCardNumbers();
        refreshCampaign();
    }
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
