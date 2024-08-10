import React, { useContext } from "react";
import AssetFaceCanvas from "./AssetFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function AssetFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<AssetFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={set("subtitle")} />
                    <InputContainer label="Cost" type="text" value={face.cost} setValue={set("cost")} />
                    <InputContainer label="Traits" type="text" value={face.traits} setValue={set("traits")} />
                    <InputContainer label="Font Size">
                        <input
                            type="number"
                            value={face.textFontSize.toFixed(1)}
                            step="0.1"
                            min="1"
                            onChange={(event) => set("textFontSize")(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Text" type="textarea" value={face.text} setValue={set("text")} />
                    <InputContainer label="Flavor">
                        <DebouncedTextareaInput value={face.flavor} setValue={set("flavor")} />
                        <label className="v-centered">
                            Nudge down
                            <input
                                type="number"
                                value={face.flavorNudgeDown.toFixed(0)}
                                step="1"
                                onChange={(event) => set("flavorNudgeDown")(parseInt(event.target.value))}
                            />
                        </label>
                    </InputContainer>
                    <InputContainer label="Skill Icon 1">
                        <select value={face.skillIcon1} onChange={(event) => set("skillIcon1")(event.target.value)}>
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 2">
                        <select value={face.skillIcon2} onChange={(event) => set("skillIcon2")(event.target.value)}>
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 3">
                        <select value={face.skillIcon3} onChange={(event) => set("skillIcon3")(event.target.value)}>
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 4">
                        <select value={face.skillIcon4} onChange={(event) => set("skillIcon4")(event.target.value)}>
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Skill Icon 5">
                        <select value={face.skillIcon5} onChange={(event) => set("skillIcon5")(event.target.value)}>
                            <option value="">None</option>
                            <option value="willpower">Willpower</option>
                            <option value="intellect">Intellect</option>
                            <option value="combat">Combat</option>
                            <option value="agility">Agility</option>
                            <option value="wild">Wild</option>
                        </select>
                    </InputContainer>
                    <InputContainer label="Health">
                        <select value={face.health} onChange={(event) => set("health")(event.target.value)}>
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
                        <select value={face.sanity} onChange={(event) => set("sanity")(event.target.value)}>
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
                        <select value={face.slot1} onChange={(event) => set("slot1")(event.target.value)}>
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
                        <select value={face.slot2} onChange={(event) => set("slot2")(event.target.value)}>
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

                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={set("cardType")} />
                    <InputContainer
                        label="Copyright Information"
                        type="text"
                        value={face.copyrightInformation}
                        setValue={set("copyrightInformation")}
                    />
                    <InputContainer label="Encounter Set ID" childId="set-id">
                        <input type="text" value={face.encounterSetId} onChange={(event) => set("encounterSetId")(event.target.value)} />
                        /
                        <input type="text" value={face.encounterSetMaxId} onChange={(event) => set("encounterSetMaxId")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Campaign Set ID" type="text" value={face.campaignSetId} setValue={set("campaignSetId")} />
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

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
