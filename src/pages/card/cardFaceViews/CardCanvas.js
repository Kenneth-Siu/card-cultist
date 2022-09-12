import React, { useEffect, useRef } from "react";

export default function CardCanvas({ loadedImages, canvasLayers, orientation }) {
    const canvas = useRef(null);

    useEffect(() => {
        if (canvas.current) {
            refreshCanvas();
        }
    }, canvasLayers);

    return (
        <div>
            <canvas
                ref={canvas}
                id="preview"
                width={orientation === "landscape" ? "1050" : "750"}
                height={orientation === "landscape" ? "750" : "1050"}
                onLoad={() => refreshCanvas()}
            />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvas.current.getContext("2d");
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        canvasLayers.forEach((canvasLayer) => {
            canvasLayer && canvasLayer.draw(context);
        });
    }
}
