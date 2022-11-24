import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function MythosFaceView({ listOfCardFaces, face, campaign, setCampaign }) {
    return (
        <BaseFaceView
            listOfCardFaces={listOfCardFaces}
            face={face}
            canvas={<MythosFaceCanvas />}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
