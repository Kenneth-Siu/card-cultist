import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import BaseFaceView from "../BaseFaceView";
import "../FaceView.scss";

export default function BlankFaceView({ faceDirection, listOfCardFaces, otherFace, face }) {
    return (
        <BaseFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            face={face}
            otherFace={otherFace}
            canvas={<BlankFaceCanvas />}
        />
    );
}
