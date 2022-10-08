import React, { useEffect, useState } from "react";
import CanvasTextLayer from "../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../models/CanvasTextConfig";
import ImageTransform from "../../models/ImageTransform";
import campaignGuideBackground from "../../../public/templates/campaignGuides/campaignGuideSquare.png";
import BaseCanvas from "../../components/BaseCanvas";
import useLoadedImages from "../../helpers/useLoadedImages";
import CanvasImageLayer from "../../models/canvasLayers/CanvasImageLayer";

/*
    First column: Start at 65, width 488
    Second column: Start at 572, width 488
*/

export default function CampaignGuideCanvas({ campaign }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [backgroundLayer, setBackgroundLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [backgroundLayer, textLayer];

    useEffect(async () => {
        setBackgroundLayer(new CanvasImageLayer(await loadPublicImage(campaignGuideBackground)));
    }, []);

    useEffect(() => {
        setTextLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(campaign.campaignGuide)
                    .withX(66)
                    .withY(77)
                    .withWidth(488)
                    .withFontSize(17.5)
                    .withLineHeight(1.32)
            )
        );
    }, [campaign.campaignGuide]);

    return <BaseCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} width={1125} height={1125} />;
}
