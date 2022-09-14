import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import MythosFace from "../../../models/cardFaces/MythosFace";
import ImageTransform from "../../../models/ImageTransform";
import CardCanvas from "./CardCanvas";
import "./FaceView.scss";
import "./MythosFaceView.scss";

export default function MythosFaceView({ typeSelect }) {
    const [loadedImages, loadPublicImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(MythosFace.frame), new ImageTransform({ scale: 2 })));
    }, []);

    return (
        <div className="face-view mythos-face-view">
            <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />
            <div className="form-container">{typeSelect}</div>
        </div>
    );
}
