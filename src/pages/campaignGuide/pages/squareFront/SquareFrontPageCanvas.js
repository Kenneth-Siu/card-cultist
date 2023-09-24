import React, { useContext, useEffect, useRef, useState } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import { FRONT_PAGE_TITLE_FONT_SIZE, INTER_WIDGET_MARGIN, SQUARE } from "../../campaignGuideConstants";
import SquareFrontPage from "./SquareFrontPage";

export default function SquareFrontPageCanvas({ page }) {
    const { campaign } = useContext(CampaignContext);
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
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(SquareFrontPage.background), new ImageTransform({ scale: 2 })));
    }, []);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(page.title.toUpperCase())
                    .withX(SQUARE.WIDTH / 2)
                    .withY(SQUARE.FRONT_PAGE_TITLE_Y)
                    .withFontSize(FRONT_PAGE_TITLE_FONT_SIZE)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [page.title]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="preview square" width={SQUARE.WIDTH} height={SQUARE.HEIGHT} onLoad={() => refreshCanvas()} />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        backgroundLayer && backgroundLayer.draw(context);
        titleLayer && titleLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = SQUARE.FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, SQUARE.LEFT_COLUMN_X, y, i === 0, campaign.campaignGuide, SQUARE).y + INTER_WIDGET_MARGIN;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = SQUARE.FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, SQUARE.RIGHT_COLUMN_X, y, i === 0, campaign.campaignGuide, SQUARE).y + INTER_WIDGET_MARGIN;
        }
    }
}
