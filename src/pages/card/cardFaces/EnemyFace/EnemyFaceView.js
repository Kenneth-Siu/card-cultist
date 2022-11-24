import React from "react";
import EnemyFaceCanvas from "./EnemyFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function EnemyFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet, campaign, setCampaign }) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={
                <EnemyFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    campaign={campaign}
                    setIllustrationTransform={setIllustrationTransform}
                />
            }
            fields={
                <>
                    <InputContainer label="Title">
                        <input type="text" value={face.title} onChange={(event) => setTitle(event.target.value)} />
                        <label>
                            Unique?
                            <input type="checkbox" checked={face.isUnique} onChange={() => toggleIsUnique()} />
                        </label>
                    </InputContainer>
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={setSubtitle} />
                    <InputContainer label="Fight" type="text" value={face.fight} setValue={setFight} />
                    <InputContainer label="Health">
                        <input type="text" value={face.health} onChange={(event) => setHealth(event.target.value)} />
                        <label>
                            Per investigator?
                            <input type="checkbox" checked={face.healthIsPer} onChange={() => toggleHealthIsPer()} />
                        </label>
                    </InputContainer>
                    <InputContainer label="Evade" type="text" value={face.evade} setValue={setEvade} />
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
                    <InputContainer label="Damage">
                        <input
                            type="number"
                            value={face.damage}
                            step="1"
                            min="0"
                            max="5"
                            onChange={(event) => setDamage(parseInt(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Horror">
                        <input
                            type="number"
                            value={face.horror}
                            step="1"
                            min="0"
                            max="5"
                            onChange={(event) => setHorror(parseInt(event.target.value))}
                        />
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

    function toggleIsUnique() {
        face.isUnique = !face.isUnique;
        setCampaign(campaign.clone());
    }

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        setCampaign(campaign.clone());
    }

    function setFight(fight) {
        face.fight = fight;
        setCampaign(campaign.clone());
    }

    function setHealth(health) {
        face.health = health;
        setCampaign(campaign.clone());
    }

    function toggleHealthIsPer() {
        face.healthIsPer = !face.healthIsPer;
        setCampaign(campaign.clone());
    }

    function setEvade(evade) {
        face.evade = evade;
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

    function setDamage(damage) {
        face.damage = damage;
        setCampaign(campaign.clone());
    }

    function setHorror(horror) {
        face.horror = horror;
        setCampaign(campaign.clone());
    }

    function setIllustrator(illustrator) {
        face.illustrator = illustrator;
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

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        face.illustration = path;
        setCampaign(campaign.clone());
    }

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }

    function setIllustrationX(x) {
        setIllustrationTransform(face.illustrationTransform.withX(x));
    }

    function setIllustrationY(y) {
        setIllustrationTransform(face.illustrationTransform.withY(y));
    }

    function setIllustrationScale(scale) {
        setIllustrationTransform(face.illustrationTransform.withScale(scale));
    }

    function setIllustrationRotation(rotation) {
        setIllustrationTransform(face.illustrationTransform.withRotation(rotation));
    }
}
