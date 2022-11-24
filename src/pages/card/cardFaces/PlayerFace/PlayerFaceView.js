import React from "react";
import PlayerFaceCanvas from "./PlayerFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function PlayerFaceView({ listOfCardFaces, face, campaign, setCampaign }) {
    return (
        <BaseFaceView
            listOfCardFaces={listOfCardFaces}
            face={face}
            canvas={<PlayerFaceCanvas />}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
