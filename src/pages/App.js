import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Treachery from "./treachery/Treachery";
import CampaignGuide from "./campaignGuide/CampaignGuide";
import "./cssreset.css";
import "./App.scss";

export default function App() {
    return (
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/treachery" component={Treachery} />
            <Route exact={true} path="/campaign-guide" component={CampaignGuide} />
        </Switch>
    );
}
