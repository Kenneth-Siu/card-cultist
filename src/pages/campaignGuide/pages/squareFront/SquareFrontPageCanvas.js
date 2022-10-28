import React, { useEffect, useRef, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import {
    CAMPAIGN_GUIDE_SQUARE_HEIGHT,
    CAMPAIGN_GUIDE_SQUARE_WIDTH,
    FRONT_PAGE_TITLE_FONT_SIZE,
    FRONT_PAGE_TITLE_Y,
    FRONT_PAGE_TOP_MARGIN,
    LEFT_COLUMN_X,
    RIGHT_COLUMN_X,
} from "../../campaignGuideConstants";

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
        setBackgroundLayer(
            new CanvasImageLayer(await loadPublicImage(page.background), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(page.title.toUpperCase())
                    .withX(CAMPAIGN_GUIDE_SQUARE_WIDTH / 2)
                    .withY(FRONT_PAGE_TITLE_Y)
                    .withFontSize(FRONT_PAGE_TITLE_FONT_SIZE)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [page.title]);

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
        titleLayer && titleLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, LEFT_COLUMN_X, y, i === 0, campaign.campaignGuide).y;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, RIGHT_COLUMN_X, y, i === 0, campaign.campaignGuide).y;
        }
    }
}
