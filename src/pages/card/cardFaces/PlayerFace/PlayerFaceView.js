import React from "react";
import PlayerFaceCanvas from "./PlayerFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function PlayerFaceView({ faceDirection, listOfCardFaces, otherFace, face, campaign, setCampaign }) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<PlayerFaceCanvas />}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
