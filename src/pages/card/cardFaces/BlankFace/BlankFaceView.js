import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import "../FaceView.scss";
import "./BlankFaceView.scss";

export default function BlankFaceView({ typeSelect }) {
    return (
        <div className="face-view blank-face-view">
            <BlankFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
