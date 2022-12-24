import React from "react";
import AssetFaceCanvas from "./AssetFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function AssetFaceView({
    faceDirection,
    listOfCardFaces,
    otherFace,
    face,
    cardSet,
    campaign,
    setCampaign,
}) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={
                <AssetFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    campaign={campaign}
                    setIllustrationTransform={setIllustrationTransform}
                />
            }
            fields={
                <>
                    <InputContainer
                        label="Title"
                        type="text"
                        value={face.title}
                        setValue={setTitle}
                    />
                    <InputContainer
                        label="Subtitle"
                        type="text"
                        value={face.subtitle}
                        setValue={setSubtitle}
                    />
                    <InputContainer label="Cost" type="text" value={face.cost} setValue={setCost} />
                    <InputContainer
                        label="Traits"
                        type="text"
                        value={face.traits}
                        setValue={setTraits}
                    />
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
                        <textarea
                            value={face.text}
                            onChange={(event) => setText(event.target.value)}
                        />
                    </InputContainer>
                    <InputContainer label="Skill Icon 1">
                        <select
                            value={face.skillIcon1}
                            onChange={(event) => setSkillIcon1(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 2">
                        <select
                            value={face.skillIcon2}
                            onChange={(event) => setSkillIcon2(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 3">
                        <select
                            value={face.skillIcon3}
                            onChange={(event) => setSkillIcon3(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 4">
                        <select
                            value={face.skillIcon4}
                            onChange={(event) => setSkillIcon4(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 5">
                        <select
                            value={face.skillIcon5}
                            onChange={(event) => setSkillIcon5(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Health">
                        <select
                            value={face.health}
                            onChange={(event) => setHealth(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="-">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Sanity">
                        <select
                            value={face.sanity}
                            onChange={(event) => setSanity(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="-">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Slot 1">
                        <select
                            value={face.slot1}
                            onChange={(event) => setSlot1(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="accessory">Accessory</option>
                            <option value="ally">Ally</option>
                            <option value="arcane">Arcane</option>
                            <option value="body">Body</option>
                            <option value="hand">Hand</option>
                            <option value="doubleArcane">2 Arcane</option>
                            <option value="doubleHand">2 Hands</option>
                            <option value="tarot">Tarot</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Slot 2">
                        <select
                            value={face.slot2}
                            onChange={(event) => setSlot2(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="accessory">Accessory</option>
                            <option value="ally">Ally</option>
                            <option value="arcane">Arcane</option>
                            <option value="body">Body</option>
                            <option value="hand">Hand</option>
                            <option value="doubleArcane">2 Arcane</option>
                            <option value="doubleHand">2 Hands</option>
                            <option value="tarot">Tarot</option>
                        </select>
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
                    <InputContainer
                        label="Card Type"
                        type="text"
                        value={face.cardType}
                        setValue={setCardType}
                    />
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

    function setSubtitle(subtitle) {
        face.subtitle = subtitle;
        setCampaign(campaign.clone());
    }

    function setCost(cost) {
        face.cost = cost;
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

    function setSkillIcon1(skillIcon) {
        face.skillIcon1 = skillIcon;
        setCampaign(campaign.clone());
    }

    function setSkillIcon2(skillIcon) {
        face.skillIcon2 = skillIcon;
        setCampaign(campaign.clone());
    }

    function setSkillIcon3(skillIcon) {
        face.skillIcon3 = skillIcon;
        setCampaign(campaign.clone());
    }

    function setSkillIcon4(skillIcon) {
        face.skillIcon4 = skillIcon;
        setCampaign(campaign.clone());
    }

    function setSkillIcon5(skillIcon) {
        face.skillIcon5 = skillIcon;
        setCampaign(campaign.clone());
    }

    function setHealth(health) {
        face.health = health;
        setCampaign(campaign.clone());
    }

    function setSanity(sanity) {
        face.sanity = sanity;
        setCampaign(campaign.clone());
    }

    function setSlot1(slot1) {
        face.slot1 = slot1;
        setCampaign(campaign.clone());
    }

    function setSlot2(slot2) {
        face.slot2 = slot2;
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
