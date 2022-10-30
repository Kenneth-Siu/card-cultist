import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
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
        <>
            <title>{campaign ? `${campaign.title} · ` : ""}Card Cultist</title>
            {campaign && <NavBar campaign={campaign} setCampaign={setCampaign} />}
            <p style={{ fontFamily: "AHCampaignFleurs", color: "transparent", position: "fixed", top: "-100px" }}>a</p>
            <p style={{ fontFamily: "AHCardTextSymbols", color: "transparent", position: "fixed", top: "-100px" }}>a</p>
            <Switch>
                <Route exact={true} path="/campaign-guide">
                    <CampaignGuideView campaign={campaign} setCampaign={setCampaign} />
                </Route>
                <Route exact={true} path="/card-set/:id">
                    <CardSetView campaign={campaign} setCampaign={setCampaign} />
                </Route>
                <Route exact={true} path="/card-set/:cardSetId/card/:id">
                    <CardView campaign={campaign} setCampaign={setCampaign} />
                </Route>
                <Route path="/">
                    <CampaignView campaign={campaign} setCampaign={setCampaign} />
                </Route>
            </Switch>
        </>
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
