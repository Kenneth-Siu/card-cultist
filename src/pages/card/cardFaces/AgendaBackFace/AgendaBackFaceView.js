import React from "react";
import AgendaBackFaceCanvas from "./AgendaBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function AgendaBackFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActBackFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={<AgendaBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            otherFace={otherFace}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
