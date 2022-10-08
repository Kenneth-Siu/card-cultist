import React from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CardCanvas from "../CardCanvas";

export default function BlankFaceCanvas() {
    const [loadedImages] = useLoadedImages();

    return <CardCanvas loadedImages={loadedImages} canvasLayers={[]} />;
}
