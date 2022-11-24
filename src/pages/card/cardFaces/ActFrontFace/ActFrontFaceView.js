import React from "react";
import ActFrontFaceCanvas from "./ActFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";

export default function ActFrontFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActFrontFaceView
            listOfCardFaces={listOfCardFaces}
            canvas={
                <ActFrontFaceCanvas
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
