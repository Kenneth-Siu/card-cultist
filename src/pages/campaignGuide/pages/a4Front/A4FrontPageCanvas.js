import React, { useContext, useEffect, useRef, useState } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import { A4, FRONT_PAGE_TITLE_FONT_SIZE, INTER_WIDGET_MARGIN } from "../../campaignGuideConstants";
import A4FrontPage from "./A4FrontPage";

// TODO update page numbers to use number font for cards

export default function A4FrontPageCanvas({ page, pageNumber }) {
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
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(A4FrontPage.background), new ImageTransform({ scale: 2 })));
    }, []);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(page.title.toUpperCase())
                    .withX(A4.WIDTH / 2)
                    .withY(A4.FRONT_PAGE_TITLE_Y)
                    .withFontSize(FRONT_PAGE_TITLE_FONT_SIZE)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [page.title]);

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
        titleLayer && titleLayer.draw(context);

        const leftWidgets = page.leftColumnWidgets;
        let y = A4.FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < leftWidgets.length; i++) {
            y = leftWidgets[i].draw(context, A4.LEFT_COLUMN_X, y, i === 0, campaign.campaignGuide, A4).y + INTER_WIDGET_MARGIN;
        }

        const rightWidgets = page.rightColumnWidgets;
        y = A4.FRONT_PAGE_TOP_MARGIN;
        for (let i = 0; i < rightWidgets.length; i++) {
            y = rightWidgets[i].draw(context, A4.RIGHT_COLUMN_X, y, i === 0, campaign.campaignGuide, A4).y + INTER_WIDGET_MARGIN;
        }
    }
}
