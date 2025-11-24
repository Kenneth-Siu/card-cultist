import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import CardCanvas, { ORIENTATION } from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import { CampaignContext } from "../../../../components/CampaignContext";
import healthIcons from "../../../../../public/templates/health/health";
import sanityIcons from "../../../../../public/templates/sanity/sanity";

export default function InvestigatorFrontFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [frameLayer, setFrameLayer] = useState(null);
    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [willpowerLayer, setWillpowerLayer] = useState(null);
    const [intellectLayer, setIntellectLayer] = useState(null);
    const [combatLayer, setCombatLayer] = useState(null);
    const [agilityLayer, setAgilityLayer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [flavorLayer, setFlavorLayer] = useState(null);
    const [healthLayer, setHealthLayer] = useState(null);
    const [sanityLayer, setSanityLayer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        frameLayer,
        titleLayer,
        subtitleLayer,
        illustrationLayer,
        willpowerLayer,
        intellectLayer,
        combatLayer,
        agilityLayer,
        traitsLayer,
        textLayer,
        flavorLayer,
        healthLayer,
        sanityLayer,
        illustratorLayer,
        copyrightInformationLayer,
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
            new CanvasImageLayer(await loadPublicImage(face.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(() => {
        // TODO Do proper unique star
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText((face.isUnique ? "<raised=-8><star></raised>" : "") + face.title)
                    .withX(317)
                    .withY(24)
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
                    .withX(317)
                    .withY(84)
                    .withFontSize(28)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.subtitle]);

    useEffect(async () => {
        setWillpowerLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.willpower)
                    .withX(598)
                    .withY(41)
                    .withFontSize(40)
                    .withFontFamily("AHCardTextSymbols")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.willpower]);

    useEffect(async () => {
        setIntellectLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.intellect)
                    .withX(719)
                    .withY(41)
                    .withFontSize(40)
                    .withFontFamily("AHCardTextSymbols")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.intellect]);

    useEffect(async () => {
        setCombatLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.combat)
                    .withX(840)
                    .withY(41)
                    .withFontSize(40)
                    .withFontFamily("AHCardTextSymbols")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.combat]);

    useEffect(async () => {
        setAgilityLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.agility)
                    .withX(961)
                    .withY(41)
                    .withFontSize(40)
                    .withFontFamily("AHCardTextSymbols")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.agility]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(814)
                    .withY(162)
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
                    .withX(610)
                    .withY(200)
                    .withWidth(400)
                    .withFontSize(face.textFontSize)
                    .withLineHeight(1.1)
                    .withCardTitle(face.title)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    useEffect(() => {
        setFlavorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.flavor)
                    .withX(610)
                    .withY(face.flavorNudgeDown)
                    .withWidth(400)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withCardSubtitle(face.subtitle)
                    .withItalic()
                    .withAlign(TEXTALIGN.CENTER)
            ).withPrevY()
        );
    }, [face.title, face.subtitle, face.text, face.textFontSize, face.flavor, face.flavorNudgeDown]);

    useEffect(async () => {
        setHealthLayer(
            face.health
                ? new CanvasImageLayer(
                    await loadPublicImage(face.health === "-" ? healthIcons[0] : healthIcons[Number.parseInt(face.health)]),
                    new ImageTransform({ scale: 1.8, x: 724, y: 610 })
                )
                : null
        );
    }, [face.health]);

    useEffect(async () => {
        setSanityLayer(
            face.sanity
                ? new CanvasImageLayer(
                    await loadPublicImage(face.sanity === "-" ? sanityIcons[0] : sanityIcons[Number.parseInt(face.sanity)]),
                    new ImageTransform({ scale: 1.8, x: 822, y: 616 })
                )
                : null
        );
    }, [face.sanity]);

    useEffect(() => {
        setIllustratorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.illustrator ? "Illus. " + face.illustrator : "")
                    .withX(576)
                    .withY(725)
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
                    .withX(840)
                    .withY(725)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.CENTER)
                    .withColor("white")
            )
        );
    }, [face.copyrightInformation]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.campaignSymbol || campaign.symbol);
        const transform = isSvgPath(face.campaignSymbol || campaign.symbol)
            ? transformSvgOnCanvas(
                { h: CARD_PORTRAIT_WIDTH, w: CARD_PORTRAIT_HEIGHT },
                { h: image.height, w: image.width },
                28
            )
            : null;
        setCampaignSymbolLayer(
            image
                ? new CanvasImageLayer(
                    image,
                    new ImageTransform({
                        x: 952 + (transform ? transform.xNudge : 0),
                        y: 718 + (transform ? transform.yNudge : 0),
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
                    .withY(725)
                    .withFontSize(18)
                    .withAlign(TEXTALIGN.RIGHT)
                    .withColor("white")
            )
        );
    }, [face.campaignSetId]);

    useEffect(() => {
        setCampaignSetIdLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.campaignSetId)
                    .withX(1010)
                    .withY(725)
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
