import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import ImageTransform from "../../../../models/ImageTransform";
import MythosFace from "./MythosFace";
import CardCanvas from "../CardCanvas";

export default function MythosFaceCanvas() {
    const [loadedImages, loadPublicImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(MythosFace.frame)));
    }, []);

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />;
}
