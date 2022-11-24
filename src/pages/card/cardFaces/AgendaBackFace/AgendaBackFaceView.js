import React from "react";
import AgendaBackFaceCanvas from "./AgendaBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function AgendaBackFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActBackFaceView
            listOfCardFaces={listOfCardFaces}
            canvas={<AgendaBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
