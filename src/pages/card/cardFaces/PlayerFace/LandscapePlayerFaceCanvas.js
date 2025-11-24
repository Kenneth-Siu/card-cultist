import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import LandscapePlayerFace from "./LandscapePlayerFace";
import CardCanvas, { ORIENTATION } from "../CardCanvas";

export default function LandscapePlayerFaceCanvas() {
    const [loadedImages, loadPublicImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(LandscapePlayerFace.frame)));
    }, []);

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} orientation={ORIENTATION.LANDSCAPE} />;
}
