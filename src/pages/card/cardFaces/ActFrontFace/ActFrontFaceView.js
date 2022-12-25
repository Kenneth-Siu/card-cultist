import React, { useContext } from "react";
import ActFrontFaceCanvas from "./ActFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function ActFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    const { refreshCampaign } = useContext(CampaignContext);
    return (
        <AgendaActFrontFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={<ActFrontFaceCanvas face={face} cardSet={cardSet} setIllustrationTransform={setIllustrationTransform} />}
            face={face}
            otherFace={otherFace}
        />
    );

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        refreshCampaign();
    }
}
