import React, { useContext } from "react";
import Container from "../../../components/container/Container";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator } from "@mui/icons-material";
import { CampaignContext } from "../../../components/CampaignContext";

export default function SortableEncounterSetsList() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <Container className="encounter-sets-list-container">
            <button onClick={generateCampaignCardNumbers}>Generate campaign card numbers</button>
            <table>
                <tbody>
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext items={campaign.cardSets} strategy={verticalListSortingStrategy}>
                            {campaign.cardSets.map((cardSet) => (
                                <SortableEncounterSetRow cardSet={cardSet} key={cardSet.id} id={cardSet.id} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </tbody>
            </table>
        </Container>
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = campaign.cardSets.findIndex((cardSet) => cardSet.id === active.id);
            const newIndex = campaign.cardSets.findIndex((cardSet) => cardSet.id === over.id);
            campaign.cardSets = arrayMove(campaign.cardSets, oldIndex, newIndex);
            refreshCampaign();
        }
    }

    function generateCampaignCardNumbers() {
        campaign.cardSets.reduce(
            (startingNumber, cardSet) => cardSet.generateCampaignCardNumbers(startingNumber) + 1,
            1
        );
        refreshCampaign();
    }
}

function SortableEncounterSetRow({ cardSet, id }) {
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
            <td>{cardSet.title}</td>
        </tr>
    );
}
