import React from "react";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";
import LandscapePlayerFaceCanvas from "./LandscapePlayerFaceCanvas";

export default function LandscapePlayerFaceView({ faceDirection, listOfCardFaces, otherFace, face }) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<LandscapePlayerFaceCanvas />}
        />
    );
}
