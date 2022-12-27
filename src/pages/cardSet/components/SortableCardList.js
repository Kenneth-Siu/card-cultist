import React, { useContext } from "react";
import { CampaignContext } from "../../../components/CampaignContext";
import DragIndicator from "@mui/icons-material/DragIndicator";
import Container from "../../../components/container/Container";
import { CSS } from "@dnd-kit/utilities";
import "./SortableCardList.scss";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function SortableCardList({ cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const sensors = useSensors(useSensor(PointerSensor));

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
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext items={cardSet.cards} strategy={verticalListSortingStrategy}>
                            {cardSet.cards.map((card) => (
                                <SortableCardRow card={card} key={card.id} id={card.id} />
                            ))}
                        </SortableContext>
                    </DndContext>
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

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = cardSet.cards.findIndex((card) => card.id === active.id);
            const newIndex = cardSet.cards.findIndex((card) => card.id === over.id);
            console.log(oldIndex, newIndex);
            cardSet.cards = arrayMove(cardSet.cards, oldIndex, newIndex);
            refreshCampaign();
        }
    }
}

function SortableCardRow({ card, id }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
                    <span className="emoji" title="Front and back faces have different encounter set card numbers">
                        ⚠
                    </span>
                )}
            </td>
        </tr>
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
