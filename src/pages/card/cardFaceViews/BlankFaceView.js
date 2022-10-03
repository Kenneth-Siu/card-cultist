import React from "react";
import CardCanvas from "./CardCanvas";
import useLoadedImages from "../../../helpers/useLoadedImages";
import "./FaceView.scss";
import "./BlankFaceView.scss";

export default function BlankFaceView({ typeSelect, canvas }) {
    const [loadedImages] = useLoadedImages();

    return (
        <div className="face-view blank-face-view">
            <div className="card-canvas-container">
                <CardCanvas canvas={canvas} loadedImages={loadedImages} canvasLayers={[]} />
            </div>
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
