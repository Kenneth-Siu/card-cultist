import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Treachery from "./treachery/Treachery";
import CampaignGuide from "./campaignGuide/CampaignGuide";
import "./cssreset.css";
import "./App.scss";
import NavBar from "./navBar/NavBar";

export default function App() {
    const [campaign, setCampaign] = useState(null);

    return (
        <>
            <title>{campaign ? `${campaign.title} · ` : ""}Card Cultist</title>
            {campaign && <NavBar campaign={campaign} />}
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
            </Switch>
        </>
    );
}
