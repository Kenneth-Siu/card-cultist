import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN, TEXTDIRECTION } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import AgendaBackFace from "./AgendaBackFace";
import CardCanvas, { ORIENTATION } from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import AgendaBackSectionsLayer from "../../../../models/canvasLayers/cardLayers/agendaBackSections/AgendaBackSectionsLayer";
import AgendaBackSectionsConfig from "../../../../models/canvasLayers/cardLayers/agendaBackSections/AgendaBackSectionsConfig";

export default function AgendaBackFaceCanvas({ face, cardSet }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [frameLayer, setFrameLayer] = useState(null);
    const [agendaWordLayer, setAgendaWordLayer] = useState(null);
    const [agendaNumberLayer, setAgendaNumberLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [
        frameLayer,
        agendaWordLayer,
        agendaNumberLayer,
        encounterSetSymbolLayer,
        titleLayer,
        textLayer,
    ];

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(await loadPublicImage(AgendaBackFace.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(() => {
        setAgendaWordLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.agendaNumber ? "AGENDA" : "")
                    .withX(88)
                    .withY(76)
                    .withFontSize(20)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.agendaNumber]);

    useEffect(() => {
        setAgendaNumberLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.agendaNumber)
                    .withX(88)
                    .withY(94)
                    .withFontSize(20)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.agendaNumber]);

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
                          x: 50 + (transform ? transform.xNudge : 0),
                          y: 108 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 76 / Math.max(image.height, image.width),
                      })
                  )
                : null
        );
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(-440)
                    .withY(102)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withTextDirection(TEXTDIRECTION.UP)
            )
        );
    }, [face.title, face.text]);

    useEffect(() => {
        setTextLayer(
            new AgendaBackSectionsLayer(
                new AgendaBackSectionsConfig()
                    .withHeader1(face.header1)
                    .withStory1(face.story1)
                    .withText1(face.text1)
                    .withHeader2(face.header2)
                    .withStory2(face.story2)
                    .withText2(face.text2)
                    .withHeader3(face.header3)
                    .withStory3(face.story3)
                    .withText3(face.text3)
                    .withX(226)
                    .withY(86)
                    .withWidth(750)
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

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} orientation={ORIENTATION.LANDSCAPE} />;
}
