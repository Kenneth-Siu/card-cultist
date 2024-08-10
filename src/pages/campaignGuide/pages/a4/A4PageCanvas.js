import React, { useContext, useEffect, useRef, useState } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import { PAGE_NUMBER_FONT_SIZE, A4, INTER_WIDGET_MARGIN } from "../../campaignGuideConstants";
import A4Page from "./A4Page";

// TODO update page numbers to use number font for cards

export default function A4PageCanvas({ page, pageNumber }) {
    const { campaign } = useContext(CampaignContext);
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
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(A4Page.background), new ImageTransform({ scale: 2 })));
    }, []);

    useEffect(() => {
        setPageNumberLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(pageNumber + "")
                    .withX(A4.WIDTH / 2 - 2)
                    .withY(A4.PAGE_NUMBER_Y)
                    .withFontSize(PAGE_NUMBER_FONT_SIZE)
                    .withFontFamily("AHCardTextSymbols")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [pageNumber]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="preview a4" width={A4.WIDTH} height={A4.HEIGHT} onLoad={() => refreshCanvas()} />
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        backgroundLayer && backgroundLayer.draw(context);
        pageNumberLayer && pageNumberLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = A4.TOP_MARGIN;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, A4.LEFT_COLUMN_X, y, i === 0, campaign.campaignGuide, A4).y + INTER_WIDGET_MARGIN;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = A4.TOP_MARGIN;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, A4.RIGHT_COLUMN_X, y, i === 0, campaign.campaignGuide, A4).y + INTER_WIDGET_MARGIN;
        }
    }
}
