import React from "react";
import LocationFrontFaceCanvas from "./LocationFrontFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function LocationFrontFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <BaseFaceView
            listOfCardFaces={listOfCardFaces}
            face={face}
            canvas={
                <LocationFrontFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    campaign={campaign}
                    setIllustrationTransform={setIllustrationTransform}
                />
            }
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={setTitle} />
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={setSubtitle} />
                    <InputContainer label="Shroud" type="text" value={face.shroud} setValue={setShroud} />
                    <InputContainer label="Clues">
                        <input type="text" value={face.clues} onChange={(event) => setClues(event.target.value)} />
                        <label>
                            Per investigator?
                            <input type="checkbox" checked={face.cluesIsPer} onChange={() => toggleCluesIsPer()} />
                        </label>
                    </InputContainer>
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
                    <InputContainer label="Victory">
                        <textarea
                            className="small"
                            value={face.victory}
                            onChange={(event) => setVictory(event.target.value)}
                        />
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

                    <Illustration
                        face={face}
                        campaign={campaign}
                        setCampaign={setCampaign}
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
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        setCampaign(campaign.clone());
    }

    function setCardType(cardType) {
        face.cardType = cardType;
        setCampaign(campaign.clone());
    }

    function setShroud(shroud) {
        face.shroud = shroud;
        setCampaign(campaign.clone());
    }

    function setClues(clues) {
        face.clues = clues;
        setCampaign(campaign.clone());
    }

    function toggleCluesIsPer() {
        face.cluesIsPer = !face.cluesIsPer;
        setCampaign(campaign.clone());
    }

    function setTraits(traits) {
        face.traits = traits;
        setCampaign(campaign.clone());
    }

    function setText(text) {
        face.text = text;
        setCampaign(campaign.clone());
    }

    function setTextFontSize(fontSize) {
        face.textFontSize = fontSize;
        setCampaign(campaign.clone());
    }

    function setVictory(victory) {
        face.victory = victory;
        setCampaign(campaign.clone());
    }

    function setConnectionSymbol(symbolName) {
        face.connectionSymbol = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection1(symbolName) {
        face.connection1 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection2(symbolName) {
        face.connection2 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection3(symbolName) {
        face.connection3 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection4(symbolName) {
        face.connection4 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection5(symbolName) {
        face.connection5 = symbolName;
        setCampaign(campaign.clone());
    }

    function setConnection6(symbolName) {
        face.connection6 = symbolName;
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

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }
}
