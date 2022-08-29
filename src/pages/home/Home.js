import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const [project, setProject] = useState({});

    return (
        <>
            <title>Card Cultist</title>
            <main className="home-page">
                <Link to="/treachery">Treachery</Link>
                <Link to="/campaign-guide">Campaign Guide</Link>
                <button
                    onClick={async () => {
                        setProject(await window.fs.loadProject());
                    }}
                >
                    Choose project
                </button>
                <button
                    onClick={async () => {
                        await window.fs.saveProject(project);
                    }}
                >
                    Save project
                </button>
                <p>{JSON.stringify(project)}</p>
            </main>
        </>
    );
}
