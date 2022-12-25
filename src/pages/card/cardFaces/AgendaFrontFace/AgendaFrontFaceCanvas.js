import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import AgendaFrontFace from "./AgendaFrontFace";
import CardCanvas, { ORIENTATION } from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import hyphen from "../../../../../public/overlays/AHLCG-Cost--.png";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function AgendaFrontFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [agendaNumberLayer, setAgendaNumberLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [doomThresholdLayer, setDoomThresholdLayer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        agendaNumberLayer,
        encounterSetSymbolLayer,
        titleLayer,
        textLayer,
        doomThresholdLayer,
        illustratorLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null);
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(AgendaFrontFace.frame), new ImageTransform({ scale: 2 })));
    }, []);

    useEffect(() => {
        setAgendaNumberLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.number ? `Agenda ${face.number}` : "")
                    .withX(764)
                    .withY(24)
                    .withFontSize(30)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.number]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        const transform = isSvgPath(face.encounterSetSymbol || cardSet.symbol)
            ? transformSvgOnCanvas({ h: CARD_PORTRAIT_WIDTH, w: CARD_PORTRAIT_HEIGHT }, { h: image.height, w: image.width }, 58)
            : null;
        setEncounterSetSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 734 + (transform ? transform.xNudge : 0),
                          y: 52 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 58 / Math.max(image.height, image.width),
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
                    .withX(764)
                    .withY(138)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title, face.text]);

    useEffect(() => {
        setTextLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.text)
                    .withX(510)
                    .withY(200)
                    .withWidth(510)
                    .withFontSize(face.textFontSize)
                    .withLineHeight(1.1)
                    .withCardTitle(face.title)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    useEffect(async () => {
        if (face.threshold === "-") {
            const image = await loadPublicImage(hyphen);
            setDoomThresholdLayer(image ? new CanvasImageLayer(image, new ImageTransform({ x: 492, y: 634, scale: 2 })) : null);
        } else {
            setDoomThresholdLayer(
                new CanvasTextLayer(
                    new CanvasTextConfig()
                        .withText(face.threshold + (face.isPer ? "<raised=-8><size=30>r</size></raised>" : ""))
                        .withX(516 + (face.threshold.includes("*") ? 4 : 0) + (face.isPer ? 4 : 0))
                        .withY(614)
                        .withFontSize(52)
                        .withFontFamily("AHCardTextSymbols")
                        .withColor("white")
                        .withAlign(TEXTALIGN.CENTER)
                        .withStrokeStyle("black")
                        .withStrokeWidth(4)
                )
            );
        }
    }, [face.threshold, face.isPer]);

    useEffect(() => {
        setIllustratorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.illustrator ? "Illus. " + face.illustrator : "")
                    .withX(442)
                    .withY(720)
                    .withFontSize(18)
                    .withColor("white")
            )
        );
    }, [face.illustrator]);

    useEffect(() => {
        setCopyrightInformationLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.copyrightInformation)
                    .withX(764)
                    .withY(720)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [face.copyrightInformation]);

    useEffect(() => {
        const text =
            face.encounterSetId || face.encounterSetMaxId
                ? face.encounterSetId + String.fromCharCode(8202) + "/" + String.fromCharCode(8202) + face.encounterSetMaxId
                : "";
        setEncounterSetIdLayer(
            new CanvasTextLayer(
                new CanvasTextConfig().withText(text).withX(916).withY(720).withFontSize(18).withAlign(TEXTALIGN.RIGHT).withColor("white")
            )
        );
    }, [face.encounterSetId, face.encounterSetMaxId]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.campaignSymbol || campaign.symbol);
        const transform = isSvgPath(face.campaignSymbol || campaign.symbol)
            ? transformSvgOnCanvas({ h: CARD_PORTRAIT_WIDTH, w: CARD_PORTRAIT_HEIGHT }, { h: image.height, w: image.width }, 28)
            : null;
        setCampaignSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 952 + (transform ? transform.xNudge : 0),
                          y: 710 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 28 / Math.max(image.height, image.width),
                      }),
                      true
                  )
                : null
        );
    }, [face.campaignSymbol, campaign.symbol]);

    useEffect(() => {
        setCampaignSetIdLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.campaignSetId)
                    .withX(1010)
                    .withY(720)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.RIGHT)
                    .withColor("white")
            )
        );
    }, [face.campaignSetId]);

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
