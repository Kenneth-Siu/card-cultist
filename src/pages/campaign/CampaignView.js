import React, { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../components/CampaignContext";
import SortableEncounterSetsList from "./components/SortableEncounterSetsList";
import Container from "../../components/container/Container";
import useLoadedImages from "../../helpers/useLoadedImages";
import Campaign from "./Campaign";
import "./CampaignView.scss";

export default function CampaignView() {
    let { campaign, setNewCampaign, loadCampaign, refreshCampaign } = useContext(CampaignContext);
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
                    <SortableEncounterSetsList />
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
                            setNewCampaign(newCampaignTitle);
                        }}
                    >
                        New campaign
                    </button>
                    <button
                        onClick={async () => {
                            // TODO Failure handling
                            const openedCampaign = await window.fs.openCampaign();
                            if (openedCampaign) {
                                loadCampaign(new Campaign(openedCampaign));
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
}
