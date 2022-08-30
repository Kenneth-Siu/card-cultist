import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar({ campaign }) {
    return (
        <nav id="nav-bar">
            <Link to="/">{campaign.title}</Link>
        </nav>
    );
}
