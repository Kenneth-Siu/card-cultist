import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function MythosFaceView({ faceDirection, listOfCardFaces, otherFace, face, campaign, setCampaign }) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<MythosFaceCanvas />}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
