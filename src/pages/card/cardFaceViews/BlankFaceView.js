import React from "react";
import "./FaceView.scss";
import "./BlankFaceView.scss";

export default function BlankFaceView({ typeSelect }) {
    return <div className="face-view blank-face-view">{typeSelect}</div>;
}
