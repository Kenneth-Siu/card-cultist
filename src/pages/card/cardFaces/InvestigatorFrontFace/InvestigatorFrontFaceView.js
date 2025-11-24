import React, { useContext } from "react";
import InvestigatorFrontFaceCanvas from "./InvestigatorFrontFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function InvestigatorFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<InvestigatorFrontFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title">
                        <input type="text" value={face.title} onChange={(event) => set("title")(event.target.value)} />
                        <label>
                            Unique?
                            <input type="checkbox" checked={face.isUnique} onChange={() => toggleIsUnique()} />
                        </label>
                    </InputContainer>
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={set("subtitle")} />
                    <InputContainer label="Willpower" type="text" value={face.willpower} setValue={set("willpower")} />
                    <InputContainer label="Intellect" type="text" value={face.intellect} setValue={set("intellect")} />
                    <InputContainer label="Combat" type="text" value={face.combat} setValue={set("combat")} />
                    <InputContainer label="Agility" type="text" value={face.agility} setValue={set("agility")} />
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
                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer
                        label="Copyright Information"
                        type="text"
                        value={face.copyrightInformation}
                        setValue={set("copyrightInformation")}
                    />
                    <InputContainer label="Campaign Symbol">
                        <button onClick={() => setCampaignSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Campaign Set ID" type="text" value={face.campaignSetId} setValue={set("campaignSetId")} />
                </>
            }
        />
    );

    function toggleIsUnique() {
        face.isUnique = !face.isUnique;
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
