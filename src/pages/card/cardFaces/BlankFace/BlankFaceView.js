import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import "../FaceView.scss";

export default function BlankFaceView({ typeSelect }) {
    return (
        <div className="face-view">
            <BlankFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
