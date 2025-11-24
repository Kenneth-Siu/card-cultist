import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import CardCanvas, { ORIENTATION } from "../CardCanvas";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function GuardianBackFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [frameLayer, setFrameLayer] = useState(null);
    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        titleLayer,
        subtitleLayer,
        textLayer,
    ];

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(
            image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null
        );
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(await loadPublicImage(face.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(() => {
        // TODO Do proper unique star
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText((face.isUnique ? "<raised=-8><star></raised>" : "") + face.title)
                    .withX(754)
                    .withY(20)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title, face.isUnique]);

    useEffect(() => {
        setSubtitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.subtitle)
                    .withX(754)
                    .withY(82)
                    .withFontSize(28)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.subtitle]);

    useEffect(() => {
        setTextLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.text)
                    .withX((dy) => dy < 330 ? Math.min(386 - 0.09 * dy, 640 - dy) : 44)
                    .withY(160)
                    .withWidth((dy) => dy < 330 ? Math.max(600 + 0.09 * dy, 346 + dy) : 942)
                    .withFontSize(face.textFontSize)
                    .withLineHeight(1.1)
                    .withCardTitle(face.title)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    return (
        <CardCanvas
            loadedImages={loadedImages}
            canvasLayers={canvasLayers}
            orientation={ORIENTATION.LANDSCAPE}
            illustrationTransform={face.illustrationTransform}
            setIllustrationTransform={setIllustrationTransform}
        />
    );
}
