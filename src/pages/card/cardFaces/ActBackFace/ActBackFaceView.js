import React from "react";
import ActBackFaceCanvas from "./ActBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function ActBackFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActBackFaceView
            typeSelect={typeSelect}
            canvas={<ActBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
