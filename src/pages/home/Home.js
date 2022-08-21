import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    return (
        <>
            <title>Card Cultist</title>
            <main className="home-page">
                <Link to="/treachery">Treachery</Link>
                <p>Place 2 doom on the nearest cultist.</p>
            </main>
        </>
    );
}
