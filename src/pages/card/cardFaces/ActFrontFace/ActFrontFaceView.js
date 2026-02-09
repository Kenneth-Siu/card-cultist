import React, { useContext } from "react";
import ActFrontFaceCanvas from "./ActFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";
import ConnectionPicker from "../../components/connectionPicker/ConnectionPicker";
import InputContainer from "../../components/inputContainer/InputContainer";
import useViewPropertySetter from "../../components/useViewPropertySetter";

export default function ActFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const set = useViewPropertySetter(face, refreshCampaign);

    return (
        <AgendaActFrontFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={<ActFrontFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            face={face}
            otherFace={otherFace}
            additionalFields={
                <>
                    <InputContainer label="Connection Symbol" vCentered>
                        <ConnectionPicker connection={face.connectionSymbol} setConnection={set("connectionSymbol")} />
                    </InputContainer>
                    <InputContainer label="Symbol X">
                        <input
                            type="number"
                            value={face.connectionSymbolX}
                            step="1"
                            onChange={(event) => set("connectionSymbolX")(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer label="Symbol Y">
                        <input
                            type="number"
                            value={face.connectionSymbolY}
                            step="1"
                            onChange={(event) => set("connectionSymbolY")(parseFloat(event.target.value))}
                        />
                    </InputContainer>
                </>
            }
        />
    );

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
