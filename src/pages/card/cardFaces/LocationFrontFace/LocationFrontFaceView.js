import React, { useContext } from "react";
import LocationFrontFaceCanvas from "./LocationFrontFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";

export default function LocationFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<LocationFrontFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            fields={
                <>
                    <InputContainer label="Title" type="text" value={face.title} setValue={set("title")} />
                    <InputContainer label="Subtitle" type="text" value={face.subtitle} setValue={set("subtitle")} />
                    <InputContainer label="Shroud" type="text" value={face.shroud} setValue={set("shroud")} />
                    <InputContainer label="Clues">
                        <input type="text" value={face.clues} onChange={(event) => set("clues")(event.target.value)} />
                        <label>
                            Per investigator?
                            <input type="checkbox" checked={face.cluesIsPer} onChange={() => toggleCluesIsPer()} />
                        </label>
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
                    <InputContainer label="Text">
                        <textarea value={face.text} onChange={(event) => set("text")(event.target.value)} />
                    </InputContainer>
                    <InputContainer label="Victory">
                        <textarea className="small" value={face.victory} onChange={(event) => set("victory")(event.target.value)} />
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
            expandableHeight="8rem"
            expandableFields={
                <>
                    <InputContainer label="Encounter Set Symbol">
                        <button onClick={() => setEncounterSetSymbol()}>Load Image</button>
                    </InputContainer>
                    <InputContainer label="Card Type" type="text" value={face.cardType} setValue={set("cardType")} />
                    <InputContainer label="Copyright Information" type="text" value={face.copyrightInformation} setValue={set("copyrightInformation")} />
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

    function toggleCluesIsPer() {
        face.cluesIsPer = !face.cluesIsPer;
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
