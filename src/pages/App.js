import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Treachery from "./treachery/Treachery";
import CampaignGuide from "./campaignGuide/CampaignGuide";
import NavBar from "./navBar/NavBar";
import CardSet from "./cardSet/CardSet";
import "./cssreset.css";
import "./App.scss";

export default function App() {
    const [campaign, setCampaign] = useState(null);

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
            </Switch>
        </>
    );
}
