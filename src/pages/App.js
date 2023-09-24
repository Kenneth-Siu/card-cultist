import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { CampaignContext } from "../components/CampaignContext";
import CampaignView from "./campaign/CampaignView";
import CampaignGuideView from "./campaignGuide/CampaignGuideView";
import NavBar from "./navBar/NavBar";
import CardSetView from "./cardSet/CardSetView";
import CardView from "./card/CardView";
import "./cssreset.css";
import "./App.scss";
import Campaign from "./campaign/Campaign";

export default function App() {
    const [campaign, setCampaign] = useState(null);
    const campaignRef = useRef();
    const setCampaignRef = useRef();
    campaignRef.current = campaign;
    setCampaignRef.current = setCampaign;

    useEffect(() => initEffectSaveKeyboardShortcut(), []);
    useEffect(async () => {
        // TODO Failure handling
        const openedCampaign = await window.fs.openLastOpened();
        if (openedCampaign) {
            setCampaign(new Campaign(openedCampaign));
        }
    }, []);

    return (
        <CampaignContext.Provider
            value={{
                campaign,
                setNewCampaign: (title) => setCampaign(new Campaign({ title })),
                loadCampaign: (campaign) => setCampaign(campaign),
                refreshCampaign: () => setCampaign(campaign.clone()),
            }}
        >
            <title>{campaign ? `${campaign.title} · ` : ""}Card Cultist</title>
            {campaign && <NavBar />}
            <Switch>
                <Route exact={true} path="/campaign-guide">
                    <CampaignGuideView />
                </Route>
                <Route exact={true} path="/card-set/:id">
                    <CardSetView />
                </Route>
                <Route exact={true} path="/card-set/:cardSetId/card/:id">
                    <CardView />
                </Route>
                <Route path="/">
                    <CampaignView />
                </Route>
            </Switch>
        </CampaignContext.Provider>
    );

    function initEffectSaveKeyboardShortcut() {
        const callback = async (event) => {
            if (campaignRef.current) {
                if ((event.metaKey || event.ctrlKey) && event.code === "KeyS") {
                    if (event.shiftKey || !campaignRef.current.path) {
                        const path = await window.fs.saveAsCampaign(campaignRef.current);
                        campaignRef.current.path = path;
                        setCampaignRef.current(campaignRef.current.clone());
                    } else {
                        window.fs.saveCampaign(campaignRef.current);
                    }
                }
            }
        };
        document.addEventListener("keydown", callback);
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }
}
