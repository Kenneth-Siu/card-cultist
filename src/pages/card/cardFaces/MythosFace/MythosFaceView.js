import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import "../FaceView.scss";
import "./MythosFaceView.scss";

export default function MythosFaceView({ typeSelect, canvasRef }) {
    return (
        <div className="face-view mythos-face-view">
            <MythosFaceCanvas canvasRef={canvasRef} />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
