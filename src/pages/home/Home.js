import React, { useState } from "react";
import Project from "../../models/Project";
import "./Home.scss";

export default function Home() {
    const [project, setProject] = useState(null);

    return (
        <>
            <title>Card Cultist</title>
            <main className="home-page">
                {project ? (
                    <div>
                        <button
                            onClick={async () => {
                                await window.fs.saveProject(project);
                            }}
                        >
                            Save project
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={async () => {
                                setProject(new Project());
                            }}
                        >
                            New project
                        </button>
                        <button
                            onClick={async () => {
                                // TODO Error checking
                                setProject(await window.fs.loadProject());
                            }}
                        >
                            Choose project
                        </button>
                    </div>
                )}
                <p>{JSON.stringify(project)}</p>
            </main>
        </>
    );
}
