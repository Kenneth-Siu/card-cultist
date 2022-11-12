import React from "react";
import AgendaBackFaceCanvas from "./AgendaBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function AgendaBackFaceView({ typeSelect, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActBackFaceView
            typeSelect={typeSelect}
            canvas={<AgendaBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}