import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import "../FaceView.scss";
import "./BlankFaceView.scss";

export default function BlankFaceView({ typeSelect, canvasRef }) {
    return (
        <div className="face-view blank-face-view">
            <div className="card-canvas-container">
                <BlankFaceCanvas canvasRef={canvasRef} />
            </div>
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
