import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import MythosFace from "../../../models/cardFaces/MythosFace";
import ImageTransform from "../../../models/ImageTransform";
import CardCanvas from "./CardCanvas";

export default function MythosFaceView() {
    const [loadedImages, loadPublicImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(MythosFace.frame), new ImageTransform({ scale: 2 })));
    }, []);

    return (
        <div>
            <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />
        </div>
    );
}
