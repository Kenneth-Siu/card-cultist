import React from "react";
import ActBackFaceCanvas from "./ActBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function ActBackFaceView({ listOfCardFaces, face, cardSet, campaign, setCampaign }) {
    return (
        <AgendaActBackFaceView
            listOfCardFaces={listOfCardFaces}
            canvas={<ActBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
