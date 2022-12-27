import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../components/CampaignContext";
import Container from "../../components/container/Container";
import useLoadedImages from "../../helpers/useLoadedImages";
import Campaign from "./Campaign";
import "./CampaignView.scss";

export default function CampaignView() {
    const sensors = useSensors(useSensor(PointerSensor));

    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [newCampaignTitle, setNewCampaignTitle] = useState("");

    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    useEffect(() => {
        if (campaign) {
            loadFileSystemImage(campaign.symbol);
        }
    }, [...[campaign && campaign.symbol]]);

    return (
        <main className="campaign-page">
            {campaign ? (
                <>
                    <Container className="campaign-details-container">
                        <input type="text" value={campaign.title} onChange={(event) => setTitle(event.target.value)} />
                        <button onClick={() => setCampaignSymbol()}>Choose campaign symbol</button>
                        {campaign.symbol && loadedImages.length > 0 ? loadedImages[loadedImages.length - 1] : ""}
                    </Container>
                    <Container className="encounter-sets-list-container">
                        <button>Generate campaign card numbers</button>
                        <table>
                            <tbody>
                                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                                    <SortableContext items={campaign.cardSets} strategy={verticalListSortingStrategy}>
                                        {campaign.cardSets.map((cardSet) => (
                                            <SortableEncounterSetRow
                                                cardSet={cardSet}
                                                key={cardSet.id}
                                                id={cardSet.id}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </tbody>
                        </table>
                    </Container>
                </>
            ) : (
                <div>
                    <input
                        type="text"
                        value={newCampaignTitle}
                        onChange={(event) => setNewCampaignTitle(event.target.value)}
                    />
                    <button
                        onClick={async () => {
                            campaign = new Campaign();
                            campaign.title = newCampaignTitle;
                            refreshCampaign();
                        }}
                    >
                        New campaign
                    </button>
                    <button
                        onClick={async () => {
                            // TODO Failure handling
                            const openedCampaign = await window.fs.openCampaign();
                            if (openedCampaign) {
                                campaign = new Campaign(openedCampaign);
                                refreshCampaign();
                            }
                        }}
                    >
                        Choose campaign
                    </button>
                </div>
            )}
        </main>
    );

    function setTitle(title) {
        campaign.title = title;
        refreshCampaign();
    }

    async function setCampaignSymbol() {
        const path = await window.fs.chooseIcon();
        campaign.symbol = path;
        refreshCampaign();
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = campaign.cardSets.findIndex((cardSet) => cardSet.id === active.id);
            const newIndex = campaign.cardSets.findIndex((cardSet) => cardSet.id === over.id);
            campaign.cardSets = arrayMove(campaign.cardSets, oldIndex, newIndex);
            refreshCampaign();
        }
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
