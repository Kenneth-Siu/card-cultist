import React, { useEffect, useRef } from "react";

export default function BaseCanvas({ loadedImages, canvasLayers, width, height }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            refreshCanvas();
        }
    }, canvasLayers);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="preview" width={width} height={height} onLoad={() => refreshCanvas()} />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasLayers.forEach((canvasLayer) => {
            canvasLayer && canvasLayer.draw(context);
        });
    }
}
