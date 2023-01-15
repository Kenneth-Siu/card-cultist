import React, { useContext } from "react";
import ChaosTokenEffectsFaceCanvas from "./ChaosTokenEffectsFaceCanvas";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";

export default function ChaosTokenEffectsFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<ChaosTokenEffectsFaceCanvas face={face} cardSet={cardSet} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Difficulty">
                        <select value={face.difficulty} onChange={(event) => set("difficulty")(event.target.value)}>
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
                            onChange={(event) => set("textFontSize")(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Text">
                        <textarea value={face.text} onChange={(event) => set("text")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Skull" type="text" value={face.skullText} setValue={set("skullText")} />
                    <InputContainer
                        label="Cultist"
                        type="text"
                        value={face.cultistText}
                        setValue={set("cultistText")}
                    />
                    <InputContainer label="Tablet" type="text" value={face.tabletText} setValue={set("tabletText")} />
                    <InputContainer
                        label="Elder Thing"
                        type="text"
                        value={face.elderThingText}
                        setValue={set("elderThingText")}
                    />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer
                        label="Copyright Information"
                        type="text"
                        value={face.copyrightInformation}
                        setValue={set("copyrightInformation")}
                    />
                    <InputContainer label="Encounter Set ID" childId="set-id">
                        <input
                            type="text"
                            value={face.encounterSetId}
                            onChange={(event) => set("encounterSetId")(event.target.value)}
                        />
                        /
                        <input
                            type="text"
                            value={face.encounterSetMaxId}
                            onChange={(event) => set("encounterSetMaxId")(event.target.value)}
                        />
                    </InputContainer>
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer
                        label="Campaign Set ID"
                        type="text"
                        value={face.campaignSetId}
                        setValue={set("campaignSetId")}
                    />
                </>
            }
        />
    );

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
