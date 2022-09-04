import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Treachery from "./treachery/Treachery";
import CampaignGuide from "./campaignGuide/CampaignGuide";
import NavBar from "./navBar/NavBar";
import CardSet from "./cardSet/CardSet";
import Card from "./card/Card";
import "./cssreset.css";
import "./App.scss";
import Campaign from "../models/Campaign";

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
            <Switch>
                <Route exact={true} path="/">
                    <Home campaign={campaign} setCampaign={setCampaign} />
                </Route>
                <Route exact={true} path="/treachery">
                    <Treachery />
                </Route>
                <Route exact={true} path="/campaign-guide">
                    <CampaignGuide />
                </Route>
                <Route exact={true} path="/card-set/:id">
                    <CardSet campaign={campaign} setCampaign={setCampaign} />
                </Route>
                <Route exact={true} path="/card-set/:cardSetId/card/:id">
                    <Card campaign={campaign} setCampaign={setCampaign} />
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
