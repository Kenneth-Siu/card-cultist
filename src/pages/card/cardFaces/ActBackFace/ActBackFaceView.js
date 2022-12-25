import React from "react";
import ActBackFaceCanvas from "./ActBackFaceCanvas";
import AgendaActBackFaceView from "../_AgendaActBackFace/_AgendaActBackFaceView";
import "../FaceView.scss";

export default function ActBackFaceView({ faceDirection, listOfCardFaces, otherFace, face, cardSet }) {
    return (
        <AgendaActBackFaceView
            faceDirection={faceDirection}
            listOfCardFaces={listOfCardFaces}
            canvas={<ActBackFaceCanvas face={face} cardSet={cardSet} />}
            face={face}
            otherFace={otherFace}
        />
    );
}
