import React, { useContext } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import InputContainer from "../../components/inputContainer/InputContainer";
import useViewPropertySetter from "../../components/useViewPropertySetter";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function AgendaActBackFaceView({ faceDirection, listOfCardFaces, otherFace, canvas, face }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={canvas}
            fields={
                <>
                    <InputContainer label="Number" type="text" value={face.number} setValue={set("number")} />
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Font Size">
                        <input
                            type="number"
                            value={face.textFontSize.toFixed(1)}
                            step="0.1"
                            min="1"
                            onChange={(event) => set("textFontSize")(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Header 1" type="text" value={face.header1} setValue={set("header1")} />
                    <InputContainer label="Story 1">
                        <textarea value={face.story1} onChange={(event) => set("story1")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 1">
                        <textarea value={face.text1} onChange={(event) => set("text1")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Header 2" type="text" value={face.header2} setValue={set("header2")} />
                    <InputContainer label="Story 2">
                        <textarea value={face.story2} onChange={(event) => set("story2")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 2">
                        <textarea value={face.text2} onChange={(event) => set("text2")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Header 3" type="text" value={face.header3} setValue={set("header3")} />
                    <InputContainer label="Story 3">
                        <textarea value={face.story3} onChange={(event) => set("story3")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 3">
                        <textarea value={face.text3} onChange={(event) => set("text3")(event.target.value)} />
                    </InputContainer>
                </>
            }
            expandableHeight="3rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                </>
            }
        />
    );

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        refreshCampaign();
    }
}
