import React, { useEffect, useRef, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import {
    CAMPAIGN_GUIDE_SQUARE_HEIGHT,
    CAMPAIGN_GUIDE_SQUARE_WIDTH,
    LEFT_COLUMN_X,
    PAGE_NUMBER_FONT_SIZE,
    PAGE_NUMBER_Y,
    RIGHT_COLUMN_X,
    TOP_MARGIN,
} from "../../campaignGuideConstants";

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
    }, [backgroundLayer, pageNumberLayer, campaign]);

    useEffect(async () => {
        setBackgroundLayer(
            new CanvasImageLayer(await loadPublicImage(page.background), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(() => {
        setPageNumberLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(pageNumber + "")
                    .withX(CAMPAIGN_GUIDE_SQUARE_WIDTH / 2)
                    .withY(PAGE_NUMBER_Y)
                    .withFontSize(PAGE_NUMBER_FONT_SIZE)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [pageNumber]);

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                className="preview"
                width={CAMPAIGN_GUIDE_SQUARE_WIDTH}
                height={CAMPAIGN_GUIDE_SQUARE_HEIGHT}
                onLoad={() => refreshCanvas()}
            />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        backgroundLayer && backgroundLayer.draw(context);
        pageNumberLayer && pageNumberLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = TOP_MARGIN;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, LEFT_COLUMN_X, y, i === 0, campaign.campaignGuide).y;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = TOP_MARGIN;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, RIGHT_COLUMN_X, y, i === 0, campaign.campaignGuide).y;
        }
    }
}
