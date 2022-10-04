import React from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CardCanvas from "../CardCanvas";

export default function BlankFaceCanvas({ canvasRef }) {
    const [loadedImages] = useLoadedImages();

    return <CardCanvas canvasRef={canvasRef} loadedImages={loadedImages} canvasLayers={[]} />;
}
