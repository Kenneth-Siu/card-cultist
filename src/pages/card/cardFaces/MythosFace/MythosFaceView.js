import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import "../FaceView.scss";

export default function MythosFaceView({ typeSelect }) {
    return (
        <div className="face-view">
            <MythosFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
