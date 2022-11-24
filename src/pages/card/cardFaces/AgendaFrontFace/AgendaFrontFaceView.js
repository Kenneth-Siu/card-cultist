import React from "react";
import AgendaFrontFaceCanvas from "./AgendaFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";

export default function AgendaFrontFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActFrontFaceView
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
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );

    function setIllustrationTransform(transform) {
        face.illustrationTransform = transform;
        setCampaign(campaign.clone());
    }
}
