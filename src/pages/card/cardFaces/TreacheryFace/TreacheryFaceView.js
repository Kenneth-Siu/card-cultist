import React, { useContext } from "react";
import TreacheryFaceCanvas from "./TreacheryFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function TreacheryFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={
                <TreacheryFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    setIllustrationTransform={setIllustrationTransform}
                />
            }
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                    <InputContainer label="Traits" type="text" value={face.traits} setValue={setTraits} />
                    <InputContainer label="Font Size">
                        <input
                            type="number"
                            value={face.textFontSize.toFixed(1)}
                            step="0.1"
                            min="1"
                            onChange={(event) => setTextFontSize(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Text">
                        <textarea value={face.text} onChange={(event) => setText(event.target.value)} />
                    </InputContainer>

                    <Illustration
                        face={face}
                        setIllustrationTransform={setIllustrationTransform}
                    />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={setCardType} />
                    <InputContainer
                        label="Copyright Information"
                        type="text"
                        value={face.copyrightInformation}
                        setValue={setCopyrightInformation}
                    />
                    <InputContainer label="Encounter Set ID" childId="set-id">
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
                    </InputContainer>
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer
                        label="Campaign Set ID"
                        type="text"
                        value={face.campaignSetId}
                        setValue={setCampaignSetId}
                    />
                </>
            }
        />
    );

    function setCardType(cardType) {
        face.cardType = cardType;
        refreshCampaign();
    }

    function setTitle(title) {
        face.title = title;
        refreshCampaign();
    }

    function setTraits(traits) {
        face.traits = traits;
        refreshCampaign();
    }

    function setText(text) {
        face.text = text;
        refreshCampaign();
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
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

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
