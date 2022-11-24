import React from "react";
import TreacheryFaceCanvas from "./TreacheryFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function TreacheryFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <BaseFaceView
            listOfCardFaces={listOfCardFaces}
            face={face}
            canvas={
                <TreacheryFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    campaign={campaign}
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

    function setCardType(cardType) {
        face.cardType = cardType;
        setCampaign(campaign.clone());
    }

    function setTitle(title) {
        face.title = title;
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
