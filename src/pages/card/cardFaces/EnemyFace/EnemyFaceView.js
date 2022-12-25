import React, { useContext } from "react";
import EnemyFaceCanvas from "./EnemyFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function EnemyFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<EnemyFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
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
                        <textarea className="small" value={face.victory} onChange={(event) => setVictory(event.target.value)} />
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

                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={setCardType} />
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

    function setCardType(cardType) {
        face.cardType = cardType;
        refreshCampaign();
    }

    function setTitle(title) {
        face.title = title;
        refreshCampaign();
    }

    function toggleIsUnique() {
        face.isUnique = !face.isUnique;
        refreshCampaign();
    }

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        refreshCampaign();
    }

    function setFight(fight) {
        face.fight = fight;
        refreshCampaign();
    }

    function setHealth(health) {
        face.health = health;
        refreshCampaign();
    }

    function toggleHealthIsPer() {
        face.healthIsPer = !face.healthIsPer;
        refreshCampaign();
    }

    function setEvade(evade) {
        face.evade = evade;
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

    function setVictory(victory) {
        face.victory = victory;
        refreshCampaign();
    }

    function setDamage(damage) {
        face.damage = damage;
        refreshCampaign();
    }

    function setHorror(horror) {
        face.horror = horror;
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
