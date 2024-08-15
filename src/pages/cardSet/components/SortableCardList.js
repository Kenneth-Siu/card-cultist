import React, { useContext } from "react";
import { CampaignContext } from "../../../components/CampaignContext";
import DragIndicator from "@mui/icons-material/DragIndicator";
import Container from "../../../components/container/Container";
import "./SortableCardList.scss";
import SortableTable from "../../../components/sortableTable/sortableTable";
import SortableThead from "../../../components/sortableTable/SortableThead";
import SortableTr from "../../../components/sortableTable/SortableTheadTr";
import SortableTh from "../../../components/sortableTable/SortableTh";
import SortableTbody from "../../../components/sortableTable/SortableTbody";
import SortableTbodyTr from "../../../components/sortableTable/SortableTbodyTr";
import SortableTd from "../../../components/sortableTable/SortableTd";

export default function SortableCardList({ cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <Container className="sortable-card-list-container">
            <button onClick={orderCardSet}>Order cards by type</button>
            <button onClick={generateEncounterSetCardNumbers}>Generate encounter set card numbers</button>
            <SortableTable>
                <SortableThead>
                    <SortableTr>
                        <SortableTh></SortableTh>
                        <SortableTh>Title</SortableTh>
                        <SortableTh>Type</SortableTh>
                        <SortableTh># of copies</SortableTh>
                        <SortableTh>Encounter set card number</SortableTh>
                    </SortableTr>
                </SortableThead>
                <SortableTbody items={cardSet.cards} setItems={setCards}>
                    {cardSet.cards.map((card) => (
                        <SortableCardRow card={card} key={card.id} id={card.id} />
                    ))}
                </SortableTbody>
            </SortableTable>
        </Container>
    );

    function setCards(cards) {
        cardSet.cards = cards;
        refreshCampaign();
    }

    function orderCardSet() {
        cardSet.orderCards();
        refreshCampaign();
    }

    function generateEncounterSetCardNumbers() {
        cardSet.generateEncounterSetCardNumbers();
        refreshCampaign();
    }
}

function SortableCardRow({ card, id }) {
    return (
        <SortableTbodyTr id={id}>
            <SortableTd className="drag-indicator">
                <DragIndicator />
            </SortableTd>
            <SortableTd>{card.getTitle()}</SortableTd>
            <SortableTd>
                <span className="emoji">{card.getEmoji()}</span> {card.frontFace.type}
            </SortableTd>
            <SortableTd>{card.numOfCopies}</SortableTd>
            <SortableTd>
                {card.frontFace.encounterSetId || card.frontFace.encounterSetMaxId
                    ? card.frontFace.encounterSetId +
                    String.fromCharCode(8202) +
                    "/" +
                    String.fromCharCode(8202) +
                    card.frontFace.encounterSetMaxId
                    : ""}{" "}
                {hasInconsistentEncounterSetIds(card) && (
                    <span className="emoji" title="Front and back faces have different encounter set card numbers">
                        ⚠
                    </span>
                )}
            </SortableTd>
        </SortableTbodyTr>
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
