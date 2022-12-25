import React, { useContext } from "react";
import ChaosTokenEffectsFaceCanvas from "./ChaosTokenEffectsFaceCanvas";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function ChaosTokenEffectsFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<ChaosTokenEffectsFaceCanvas face={face} cardSet={cardSet} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                    <InputContainer label="Difficulty">
                        <select value={face.difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                            {ChaosTokenEffectsFace.DIFFICULTY.map((difficulty) => (
                                <option key={difficulty} value={difficulty}>
                                    {difficulty}
                                </option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer label="Font Size">
                        <input
                            type="number"
                            value={face.textFontSize.toFixed(1)}
                            step="0.1"
                            min="1"
                            onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Skull" type="text" value={face.skullText} setValue={setSkullText} />
                    <InputContainer label="Cultist" type="text" value={face.cultistText} setValue={setCultistText} />
                    <InputContainer label="Tablet" type="text" value={face.tabletText} setValue={setTabletText} />
                    <InputContainer label="Elder Thing" type="text" value={face.elderThingText} setValue={setElderThingText} />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Copyright Information" type="text" value={face.copyrightInformation} setValue={setCopyrightInformation} />
                    <InputContainer label="Encounter Set ID" childId="set-id">
                        <input type="text" value={face.encounterSetId} onChange={(event) => setEncounterSetId(event.target.value)} />
                        /
                        <input type="text" value={face.encounterSetMaxId} onChange={(event) => setEncounterSetMaxId(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Campaign Set ID" type="text" value={face.campaignSetId} setValue={setCampaignSetId} />
                </>
            }
        />
    );

    function setTitle(title) {
        face.title = title;
        refreshCampaign();
    }

    function setDifficulty(difficulty) {
        face.difficulty = difficulty;
        refreshCampaign();
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        refreshCampaign();
    }

    function setSkullText(skullText) {
        face.skullText = skullText;
        refreshCampaign();
    }

    function setCultistText(cultistText) {
        face.cultistText = cultistText;
        refreshCampaign();
    }

    function setTabletText(tabletText) {
        face.tabletText = tabletText;
        refreshCampaign();
    }

    function setElderThingText(elderThingText) {
        face.elderThingText = elderThingText;
        refreshCampaign();
    }

    function setCopyrightInformation(copyrightInformation) {
        face.copyrightInformation = copyrightInformation;
        refreshCampaign();
    }

    function setEncounterSetId(encounterSetId) {
        face.encounterSetId = encounterSetId;
        refreshCampaign();
    }

    function setEncounterSetMaxId(encounterSetMaxId) {
        face.encounterSetMaxId = encounterSetMaxId;
        refreshCampaign();
    }

    function setCampaignSetId(campaignSetId) {
        face.campaignSetId = campaignSetId;
        refreshCampaign();
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        refreshCampaign();
    }

    async function setCampaignSymbol() {
        const path = await window.fs.chooseIcon();
        face.campaignSymbol = path;
        refreshCampaign();
    }
}
