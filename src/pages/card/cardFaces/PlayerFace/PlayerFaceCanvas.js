import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import ImageTransform from "../../../../models/ImageTransform";
import PlayerFace from "./PlayerFace";
import CardCanvas from "../CardCanvas";

export default function PlayerFaceCanvas() {
    const [loadedImages, loadPublicImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(PlayerFace.frame), new ImageTransform({ scale: 2 })));
    }, []);

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />;
}
