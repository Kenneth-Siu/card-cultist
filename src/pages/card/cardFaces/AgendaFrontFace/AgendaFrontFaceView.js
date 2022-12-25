import React, { useContext } from "react";
import AgendaFrontFaceCanvas from "./AgendaFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function AgendaFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);

    return (
        <AgendaActFrontFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={<AgendaFrontFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            face={face}
            otherFace={otherFace}
        />
    );

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
