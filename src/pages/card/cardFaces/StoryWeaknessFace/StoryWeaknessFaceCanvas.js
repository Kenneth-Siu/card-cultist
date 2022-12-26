import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import StoryWeaknessFace from "./StoryWeaknessFace";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function StoryWeaknessFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);

    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [encounterSetIconFrameLayer, setEncounterSetIconFrameLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [subTypeLayer, setSubTypeLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [flavorLayer, setFlavorLayer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        encounterSetIconFrameLayer,
        encounterSetSymbolLayer,
        cardTypeLayer,
        subTypeLayer,
        titleLayer,
        traitsLayer,
        textLayer,
        flavorLayer,
        illustratorLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(
            image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null
        );
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(await loadPublicImage(StoryWeaknessFace.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(async () => {
        setEncounterSetIconFrameLayer(
            new CanvasImageLayer(
                await loadPublicImage(StoryWeaknessFace.encounterSetIconFrame),
                new ImageTransform({ x: 312, y: 486, scale: 2 })
            )
        );
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        const transform = isSvgPath(face.encounterSetSymbol || cardSet.symbol)
            ? transformSvgOnCanvas(
                  { h: CARD_PORTRAIT_HEIGHT, w: CARD_PORTRAIT_WIDTH },
                  { h: image.height, w: image.width },
                  58
              )
            : null;
        setEncounterSetSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 348 + (transform ? transform.xNudge : 0),
                          y: 506 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 58 / Math.max(image.height, image.width),
                      })
                  )
                : null
        );
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(() => {
        setCardTypeLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.cardType.toUpperCase().split("").join(String.fromCharCode(8202)))
                    .withX(374)
                    .withY(573)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

    useEffect(() => {
        setSubTypeLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.subType.toUpperCase())
                    .withX(374)
                    .withY(676)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.subType]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(374)
                    .withY(616)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title, face.text]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(716)
                    .withFontSize(30)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
                    .withItalic()
            )
        );
    }, [face.traits]);

    useEffect(() => {
        setTextLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.text)
                    .withX(62)
                    .withY(754)
                    .withWidth(626)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withLineHeight(1.05)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    useEffect(() => {
        setFlavorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.flavor)
                    .withX(40)
                    .withY(face.flavorNudgeDown)
                    .withWidth(670)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withItalic()
                    .withAlign(TEXTALIGN.CENTER)
            ).withPrevY()
        );
    }, [face.title, face.text, face.textFontSize, face.flavor, face.flavorNudgeDown]);

    useEffect(() => {
        setIllustratorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.illustrator ? "Illus. " + face.illustrator : "")
                    .withX(36)
                    .withY(1026)
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
                    .withX(374)
                    .withY(1026)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [face.copyrightInformation]);

    useEffect(() => {
        const text =
            face.encounterSetId || face.encounterSetMaxId
                ? face.encounterSetId +
                  String.fromCharCode(8202) +
                  "/" +
                  String.fromCharCode(8202) +
                  face.encounterSetMaxId
                : "";
        setEncounterSetIdLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(text)
                    .withX(602)
                    .withY(1026)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.RIGHT)
                    .withColor("white")
            )
        );
    }, [face.encounterSetId, face.encounterSetMaxId]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.campaignSymbol || campaign.symbol);
        const transform = isSvgPath(face.campaignSymbol || campaign.symbol)
            ? transformSvgOnCanvas(
                  { h: CARD_PORTRAIT_HEIGHT, w: CARD_PORTRAIT_WIDTH },
                  { h: image.height, w: image.width },
                  28
              )
            : null;
        setCampaignSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 639 + (transform ? transform.xNudge : 0),
                          y: 1020 + (transform ? transform.yNudge : 0),
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
                    .withX(716)
                    .withY(1026)
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
            illustrationTransform={face.illustrationTransform}
            setIllustrationTransform={setIllustrationTransform}
        />
    );
}
