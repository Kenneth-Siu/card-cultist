import React, { useState } from "react";
import Campaign from "../../models/Campaign";
import "./Home.scss";

export default function Home({ campaign, setCampaign }) {
    const [newCampaignTitle, setNewCampaignTitle] = useState("");

    return (
        <main className="home-page">
            {campaign ? (
                <div>Start editing!</div>
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
}
