import React, { useEffect, useRef, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";

export default function SquareFrontPageCanvas({ page, campaign }) {
    const [loadedImages, loadPublicImage] = useLoadedImages();

    const canvasRef = useRef(null);

    const [backgroundLayer, setBackgroundLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            refreshCanvas();
        }
    }, [backgroundLayer, titleLayer, campaign]);

    useEffect(async () => {
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(page.background)));
    }, []);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(page.title.toUpperCase())
                    .withX(562)
                    .withY(317)
                    .withFontSize(44)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [page.title]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="preview" width={1125} height={1125} onLoad={() => refreshCanvas()} />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        backgroundLayer && backgroundLayer.draw(context);
        titleLayer && titleLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = 68;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, 66, y, i === 0).y;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = 68;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, 572, y, i === 0).y;
        }
    }
}
