import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import "../FaceView.scss";
import "./BlankFaceView.scss";

export default function BlankFaceView({ typeSelect }) {
    return (
        <div className="face-view blank-face-view">
            <div className="card-canvas-container">
                <BlankFaceCanvas />
            </div>
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
