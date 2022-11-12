import React from "react";
import ActFrontFaceCanvas from "./ActFrontFaceCanvas";
import AgendaActFrontFaceView from "../_AgendaActFrontFace/_AgendaActFrontFaceView";
import "../FaceView.scss";

export default function ActFrontFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActFrontFaceView
            typeSelect={typeSelect}
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
