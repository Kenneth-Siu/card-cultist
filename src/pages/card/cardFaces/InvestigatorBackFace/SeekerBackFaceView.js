import React, { useContext } from "react";
import SeekerBackFaceCanvas from "./SeekerBackFaceCanvas";
import Illustration from "../../components/illustration/Illustration";
import InputContainer from "../../components/inputContainer/InputContainer";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import useViewPropertySetter from "../../components/useViewPropertySetter";

export default function SeekerBackFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<SeekerBackFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
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
                    <Illustration face={face} setIllustrationTransform={setIllustrationTransform} />
                </>
            }
        />
    );

    function toggleIsUnique() {
        face.isUnique = !face.isUnique;
        refreshCampaign();
    }

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
