import React from "react";
import AgendaFrontFaceCanvas from "./AgendaFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";

export default function AgendaFrontFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActFrontFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={
                <AgendaFrontFaceCanvas
                    face={face}
                    cardSet={cardSet}
                    campaign={campaign}
                    setIllustrationTransform={setIllustrationTransform}
                />
            }
            face={face}
            otherFace={otherFace}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }
}
