import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import "./cssreset.css";
import "./App.scss";

export default function App() {
    return (
        <Switch>
            <Route exact={true} path="/" component={Home} />
        </Switch>
    );
}
