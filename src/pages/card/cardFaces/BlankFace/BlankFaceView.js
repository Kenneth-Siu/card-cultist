import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function BlankFaceView({ listOfCardFaces, face, campaign, setCampaign }) {
    return (
        <BaseFaceView
            listOfCardFaces={listOfCardFaces}
            face={face}
            canvas={<BlankFaceCanvas />}
            campaign={campaign}
            setCampaign={setCampaign}
        />
    );
}
