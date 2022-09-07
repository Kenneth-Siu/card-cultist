import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import mythosBack from "../../../../public/templates/backs/mythosBack.png";
import CardCanvas from "./CardCanvas";

export default function MythosFaceView() {
    const [loadedImages, loadImage] = useLoadedImages();
    const [frameLayer, setFrameLayer] = useState(null);

    const canvasLayers = [frameLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadImage(mythosBack, 750, 1050), 0, 0));
    }, []);

    return (
        <div>
            <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />
        </div>
    );
}
