import React, { useContext } from "react";
import LocationBackFaceCanvas from "./LocationBackFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function LocationBackFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<LocationBackFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={setSubtitle} />
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
                    <InputContainer label="Connection Symbol" vCentered>
                        <ConnectionPicker connection={face.connectionSymbol} setConnection={setConnectionSymbol} />
                    </InputContainer>
                    <InputContainer label="Connections" vCentered>
                        <ConnectionPicker connection={face.connection1} setConnection={setConnection1} />
                        <ConnectionPicker connection={face.connection2} setConnection={setConnection2} />
                        <ConnectionPicker connection={face.connection3} setConnection={setConnection3} />
                        <ConnectionPicker connection={face.connection4} setConnection={setConnection4} />
                        <ConnectionPicker connection={face.connection5} setConnection={setConnection5} />
                        <ConnectionPicker connection={face.connection6} setConnection={setConnection6} />
                    </InputContainer>

                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
            expandableHeight="6rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={setCardType} />
                    <InputContainer label="Copyright Information" type="text" value={face.copyrightInformation} setValue={setCopyrightInformation} />
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                </>
            }
        />
    );

    function setTitle(title) {
        face.title = title;
        refreshCampaign();
    }

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        refreshCampaign();
    }

    function setCardType(cardType) {
        face.cardType = cardType;
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

    function setConnectionSymbol(symbolName) {
        face.connectionSymbol = symbolName;
        refreshCampaign();
    }

    function setConnection1(symbolName) {
        face.connection1 = symbolName;
        refreshCampaign();
    }

    function setConnection2(symbolName) {
        face.connection2 = symbolName;
        refreshCampaign();
    }

    function setConnection3(symbolName) {
        face.connection3 = symbolName;
        refreshCampaign();
    }

    function setConnection4(symbolName) {
        face.connection4 = symbolName;
        refreshCampaign();
    }

    function setConnection5(symbolName) {
        face.connection5 = symbolName;
        refreshCampaign();
    }

    function setConnection6(symbolName) {
        face.connection6 = symbolName;
        refreshCampaign();
    }

    function setCopyrightInformation(copyrightInformation) {
        face.copyrightInformation = copyrightInformation;
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
