import React from "react";
import MythosFaceCanvas from "./MythosFaceCanvas";
import "../FaceView.scss";
import "./MythosFaceView.scss";

export default function MythosFaceView({ typeSelect }) {
    return (
        <div className="face-view mythos-face-view">
            <MythosFaceCanvas />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
