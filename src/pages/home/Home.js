import React, { useEffect, useState } from "react";
import useLoadedImages from "../../helpers/useLoadedImages";
import Campaign from "../../models/Campaign";
import "./Home.scss";

export default function Home({ campaign, setCampaign }) {
    const [newCampaignTitle, setNewCampaignTitle] = useState("");

    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    useEffect(() => {
        if (campaign) {
            loadFileSystemImage(campaign.symbol);
        }
    }, [...[campaign && campaign.symbol]]);

    return (
        <main className="home-page">
            {campaign ? (
                <div>
                    <input type="text" value={campaign.title} onChange={(event) => setTitle(event.target.value)} />
                    <button onClick={() => setCampaignSymbol()}>Choose campaign symbol</button>
                    {campaign.symbol && loadedImages.length > 0 ? loadedImages[loadedImages.length - 1] : ""}
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={newCampaignTitle}
                        onChange={(event) => setNewCampaignTitle(event.target.value)}
                    />
                    <button
                        onClick={async () => {
                            const newCampaign = new Campaign();
                            newCampaign.title = newCampaignTitle;
                            setCampaign(newCampaign);
                        }}
                    >
                        New campaign
                    </button>
                    <button
                        onClick={async () => {
                            // TODO Failure handling
                            const openedCampaign = await window.fs.openCampaign();
                            if (openedCampaign) {
                                setCampaign(new Campaign(openedCampaign));
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
        setCampaign(campaign.clone());
    }

    // TODO doesn't work with SVGs
    async function setCampaignSymbol() {
        const path = await window.fs.chooseIcon();
        campaign.symbol = path;
        setCampaign(campaign.clone());
    }
}
