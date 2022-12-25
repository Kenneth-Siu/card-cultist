import React, { useContext } from "react";
import StoryFaceCanvas from "./StoryFaceCanvas";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function StoryFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<StoryFaceCanvas face={face} cardSet={cardSet} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                    <InputContainer label="Font Size">
                        <input
                            type="number"
                            value={face.textFontSize.toFixed(1)}
                            step="0.1"
                            min="1"
                            onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Header 1" type="text" value={face.header1} setValue={setHeader1} />
                    <InputContainer label="Story 1">
                        <textarea value={face.story1} onChange={(event) => setStory1(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 1">
                        <textarea value={face.text1} onChange={(event) => setText1(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Header 2" type="text" value={face.header2} setValue={setHeader2} />
                    <InputContainer label="Story 2">
                        <textarea value={face.story2} onChange={(event) => setStory2(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 2">
                        <textarea value={face.text2} onChange={(event) => setText2(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Header 3" type="text" value={face.header3} setValue={setHeader3} />
                    <InputContainer label="Story 3">
                        <textarea value={face.story3} onChange={(event) => setStory3(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Text 3">
                        <textarea value={face.text3} onChange={(event) => setText3(event.target.value)} />
                    </InputContainer>
                </>
            }
            expandableHeight="3rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={setCardType} />
                </>
            }
        />
    );

    function setTitle(title) {
        face.title = title;
        refreshCampaign();
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        refreshCampaign();
    }

    function setHeader1(header1) {
        face.header1 = header1;
        refreshCampaign();
    }

    function setHeader2(header2) {
        face.header2 = header2;
        refreshCampaign();
    }

    function setHeader3(header3) {
        face.header3 = header3;
        refreshCampaign();
    }

    function setStory1(story1) {
        face.story1 = story1;
        refreshCampaign();
    }

    function setStory2(story2) {
        face.story2 = story2;
        refreshCampaign();
    }

    function setStory3(story3) {
        face.story3 = story3;
        refreshCampaign();
    }

    function setText1(text1) {
        face.text1 = text1;
        refreshCampaign();
    }

    function setText2(text2) {
        face.text2 = text2;
        refreshCampaign();
    }

    function setText3(text3) {
        face.text3 = text3;
        refreshCampaign();
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        refreshCampaign();
    }

    function setCardType(cardType) {
        face.cardType = cardType;
        refreshCampaign();
    }
}
