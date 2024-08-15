import React, { useContext } from "react";
import Container from "../../../components/container/Container";
import { DragIndicator } from "@mui/icons-material";
import { CampaignContext } from "../../../components/CampaignContext";
import SortableTable from "../../../components/sortableTable/sortableTable";
import SortableTbody from "../../../components/sortableTable/SortableTbody";
import SortableTbodyTr from "../../../components/sortableTable/SortableTbodyTr";
import SortableTd from "../../../components/sortableTable/SortableTd";

export default function SortableEncounterSetsList() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);

    return (
        <Container className="encounter-sets-list-container">
            <button onClick={generateCampaignCardNumbers}>Generate campaign card numbers</button>
            <SortableTable>
                <SortableTbody items={campaign.cardSets} setItems={setCardSets}>
                    {campaign.cardSets.map((cardSet) => (
                        <SortableEncounterSetRow cardSet={cardSet} key={cardSet.id} id={cardSet.id} />
                    ))}
                </SortableTbody>
            </SortableTable>
        </Container>
    );

    function setCardSets(cardSets) {
        campaign.cardSets = cardSets;
        refreshCampaign();
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
    return (
        <SortableTbodyTr id={id}>
            <SortableTd className="drag-indicator">
                <DragIndicator />
            </SortableTd>
            <SortableTd>{cardSet.title}</SortableTd>
        </SortableTbodyTr>
    );
}
