import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import StoryFace from "./StoryFace";
import AgendaActBackSectionsConfig from "../../../../models/canvasLayers/cardLayers/agendaActBackSections/AgendaActBackSectionsConfig";
import AgendaActBackSectionsLayer from "../../../../models/canvasLayers/cardLayers/agendaActBackSections/AgendaActBackSectionsLayer";

export default function StoryFaceCanvas({ face, cardSet }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [frameLayer, setFrameLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);

    const canvasLayers = [frameLayer, encounterSetSymbolLayer, titleLayer, textLayer, cardTypeLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(StoryFace.frame), new ImageTransform({ scale: 2 })));
    }, []);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(328)
                    .withY(104)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title, face.text]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        const transform = isSvgPath(face.encounterSetSymbol || cardSet.symbol)
            ? transformSvgOnCanvas(
                  { h: CARD_PORTRAIT_WIDTH, w: CARD_PORTRAIT_HEIGHT },
                  { h: image.height, w: image.width },
                  76
              )
            : null;
        setEncounterSetSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 614 + (transform ? transform.xNudge : 0),
                          y: 50 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 76 / Math.max(image.height, image.width),
                      })
                  )
                : null
        );
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(() => {
        setTextLayer(
            new AgendaActBackSectionsLayer(
                new AgendaActBackSectionsConfig()
                    .withHeader1(face.header1)
                    .withStory1(face.story1)
                    .withText1(face.text1)
                    .withHeader2(face.header2)
                    .withStory2(face.story2)
                    .withText2(face.text2)
                    .withHeader3(face.header3)
                    .withStory3(face.story3)
                    .withText3(face.text3)
                    .withX(72)
                    .withY(222)
                    .withWidth(606)
                    .withFontSize(face.textFontSize)
                    .withLineHeight(1.1)
                    .withCardTitle(face.title)
            )
        );
    }, [
        face.title,
        face.textFontSize,
        face.header1,
        face.story1,
        face.text1,
        face.header2,
        face.story2,
        face.text2,
        face.header3,
        face.story3,
        face.text3,
    ]);

    useEffect(() => {
        setCardTypeLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.cardType.toUpperCase())
                    .withX(374)
                    .withY(1036)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />;
}
