import React, { useContext } from "react";
import LocationBackFaceCanvas from "./LocationBackFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";
import DebouncedTextareaInput from "../../../../components/debouncedInputs/DebouncedTextareaInput";

export default function LocationBackFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<LocationBackFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={set("subtitle")} />
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
                    <InputContainer label="Connection Symbol" vCentered>
                        <ConnectionPicker connection={face.connectionSymbol} setConnection={set("connectionSymbol")} />
                    </InputContainer>
                    <InputContainer label="Connections" vCentered>
                        <ConnectionPicker connection={face.connection1} setConnection={set("connection1")} />
                        <ConnectionPicker connection={face.connection2} setConnection={set("connection2")} />
                        <ConnectionPicker connection={face.connection3} setConnection={set("connection3")} />
                        <ConnectionPicker connection={face.connection4} setConnection={set("connection4")} />
                        <ConnectionPicker connection={face.connection5} setConnection={set("connection5")} />
                        <ConnectionPicker connection={face.connection6} setConnection={set("connection6")} />
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
