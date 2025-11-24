import React, { useContext } from "react";
import NeutralEventFaceCanvas from "./NeutralEventFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function NeutralEventFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<NeutralEventFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Cost" type="text" value={face.cost} setValue={set("cost")} />
                    <InputContainer label="Level">
                        <select value={face.level} onChange={(event) => set("level")(event.target.value)}>
                            <option value="">None</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
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

                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={set("cardType")} />
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
