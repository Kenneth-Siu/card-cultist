import React, { useEffect, useRef, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";

// TODO update page numbers to use number font for cards

export default function SquarePageCanvas({ page, pageNumber, campaign }) {
    const [loadedImages, loadPublicImage] = useLoadedImages();

    const canvasRef = useRef(null);

    const [backgroundLayer, setBackgroundLayer] = useState(null);
    const [pageNumberLayer, setPageNumberLayer] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            refreshCanvas();
        }
    }, [
        backgroundLayer,
        pageNumberLayer,
        campaign
    ]);

    useEffect(async () => {
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(page.background)));
    }, []);

    useEffect(() => {
        setPageNumberLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(pageNumber + 1 + "")
                    .withX(562)
                    .withY(1104)
                    .withFontSize(36)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [pageNumber]);

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
        pageNumberLayer && pageNumberLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = 68;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, 66, y, i === 0);
        }

        const rightWidgets = page.rightColumnWidgets;
        y = 68;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, 572, y, i === 0);
        }
    }
}
