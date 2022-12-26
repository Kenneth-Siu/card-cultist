import React, { useContext } from "react";
import EnemyFaceCanvas from "./EnemyFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";

export default function EnemyFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
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
                        <input type="text" value={face.title} onChange={(event) => set("title")(event.target.value)} />
                        <label>
                            Unique?
                            <input type="checkbox" checked={face.isUnique} onChange={() => toggleIsUnique()} />
                        </label>
                    </InputContainer>
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={set("subtitle")} />
                    <InputContainer label="Fight" type="text" value={face.fight} setValue={set("fight")} />
                    <InputContainer label="Health">
                        <input type="text" value={face.health} onChange={(event) => set("health")(event.target.value)} />
                        <label>
                            Per investigator?
                            <input type="checkbox" checked={face.healthIsPer} onChange={() => toggleHealthIsPer()} />
                        </label>
                    </InputContainer>
                    <InputContainer label="Evade" type="text" value={face.evade} setValue={set("evade")} />
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
                    <InputContainer label="Text">
                        <textarea value={face.text} onChange={(event) => set("text")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Flavor">
                        <textarea value={face.flavor} onChange={(event) => set("flavor")(event.target.value)} />
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
                    <InputContainer label="Victory">
                        <textarea className="small" value={face.victory} onChange={(event) => set("victory")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Damage">
                        <input
                            type="number"
                            value={face.damage}
                            step="1"
                            min="0"
                            max="5"
                            onChange={(event) => set("damage")(parseInt(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Horror">
                        <input
                            type="number"
                            value={face.horror}
                            step="1"
                            min="0"
                            max="5"
                            onChange={(event) => set("horror")(parseInt(event.target.value))}
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

    function toggleIsUnique() {
        face.isUnique = !face.isUnique;
        refreshCampaign();
    }

    function toggleHealthIsPer() {
        face.healthIsPer = !face.healthIsPer;
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
