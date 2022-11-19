import React from "react";
import ChaosTokenEffectsFaceCanvas from "./ChaosTokenEffectsFaceCanvas";
import Container from "../../../../components/container/Container";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace";
import "../FaceView.scss";

export default function ChaosTokenEffectsFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <Container className="face-view">
            <ChaosTokenEffectsFaceCanvas face={face} cardSet={cardSet} campaign={campaign} />
            <div className="form-container">
                {typeSelect}

                <div className="input-container">
                    <label>Encounter Set Symbol</label>
                    <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>Title</label>
                    <input type="text" value={face.title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Difficulty</label>
                    <select value={face.difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                        {ChaosTokenEffectsFace.DIFFICULTY.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-container">
                    <label>Text Font Size</label>
                    <input
                        type="number"
                        value={face.textFontSize.toFixed(1)}
                        step="0.1"
                        min="1"
                        onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                    />
                </div>

                <div className="input-container">
                    <label>Skull</label>
                    <input type="text" value={face.skullText} onChange={(event) => setSkullText(event.target.value)} />
                </div>

                <div className="input-container">
                    <label>Cultist</label>
                    <input
                        type="text"
                        value={face.cultistText}
                        onChange={(event) => setCultistText(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Tablet</label>
                    <input
                        type="text"
                        value={face.tabletText}
                        onChange={(event) => setTabletText(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Elder Thing</label>
                    <input
                        type="text"
                        value={face.elderThingText}
                        onChange={(event) => setElderThingText(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Copyright Information</label>
                    <input
                        type="text"
                        value={face.copyrightInformation}
                        onChange={(event) => setCopyrightInformation(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Encounter Set ID</label>
                    <input
                        type="text"
                        value={face.encounterSetId}
                        onChange={(event) => setEncounterSetId(event.target.value)}
                    />
                    /
                    <input
                        type="text"
                        value={face.encounterSetMaxId}
                        onChange={(event) => setEncounterSetMaxId(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Campaign Symbol</label>
                    <button onClick={() => setCampaignSymbol()}>Load Image</button>
                </div>

                <div className="input-container">
                    <label>Campaign Set ID</label>
                    <input
                        type="text"
                        value={face.campaignSetId}
                        onChange={(event) => setCampaignSetId(event.target.value)}
                    />
                </div>
            </div>
        </Container>
    );

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setDifficulty(difficulty) {
        face.difficulty = difficulty;
        setCampaign(campaign.clone());
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        setCampaign(campaign.clone());
    }

    function setSkullText(skullText) {
        face.skullText = skullText;
        setCampaign(campaign.clone());
    }

    function setCultistText(cultistText) {
        face.cultistText = cultistText;
        setCampaign(campaign.clone());
    }

    function setTabletText(tabletText) {
        face.tabletText = tabletText;
        setCampaign(campaign.clone());
    }

    function setElderThingText(elderThingText) {
        face.elderThingText = elderThingText;
        setCampaign(campaign.clone());
    }

    function setCopyrightInformation(copyrightInformation) {
        face.copyrightInformation = copyrightInformation;
        setCampaign(campaign.clone());
    }

    function setEncounterSetId(encounterSetId) {
        face.encounterSetId = encounterSetId;
        setCampaign(campaign.clone());
    }

    function setEncounterSetMaxId(encounterSetMaxId) {
        face.encounterSetMaxId = encounterSetMaxId;
        setCampaign(campaign.clone());
    }

    function setCampaignSetId(campaignSetId) {
        face.campaignSetId = campaignSetId;
        setCampaign(campaign.clone());
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        setCampaign(campaign.clone());
    }

    async function setCampaignSymbol() {
        const path = await window.fs.chooseIcon();
        face.campaignSymbol = path;
        setCampaign(campaign.clone());
    }
}
