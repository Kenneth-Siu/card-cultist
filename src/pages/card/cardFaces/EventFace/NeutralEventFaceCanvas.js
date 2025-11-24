import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import { CampaignContext } from "../../../../components/CampaignContext";
import NeutralEventFace from "./NeutralEventFace";
import skillIcons from "../../../../../public/templates/skillIcons/skillIcons";
import skillIconFrame from "../../../../../public/templates/skillBoxes/neutral.png";
import levelOverlays from "../../../../../public/overlays/levelOverlays";

export default function NeutralEventFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [levelLayer, setLevelLayer] = useState(null);
    const [costLayer, setCostLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [skillIcon1FrameLayer, setSkillIcon1FrameLayer] = useState(null);
    const [skillIcon2FrameLayer, setSkillIcon2FrameLayer] = useState(null);
    const [skillIcon3FrameLayer, setSkillIcon3FrameLayer] = useState(null);
    const [skillIcon4FrameLayer, setSkillIcon4FrameLayer] = useState(null);
    const [skillIcon5FrameLayer, setSkillIcon5FrameLayer] = useState(null);
    const [skillIcon1Layer, setSkillIcon1Layer] = useState(null);
    const [skillIcon2Layer, setSkillIcon2Layer] = useState(null);
    const [skillIcon3Layer, setSkillIcon3Layer] = useState(null);
    const [skillIcon4Layer, setSkillIcon4Layer] = useState(null);
    const [skillIcon5Layer, setSkillIcon5Layer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [flavorLayer, setFlavorLayer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        levelLayer,
        costLayer,
        cardTypeLayer,
        titleLayer,
        skillIcon1FrameLayer,
        skillIcon2FrameLayer,
        skillIcon3FrameLayer,
        skillIcon4FrameLayer,
        skillIcon5FrameLayer,
        skillIcon1Layer,
        skillIcon2Layer,
        skillIcon3Layer,
        skillIcon4Layer,
        skillIcon5Layer,
        traitsLayer,
        textLayer,
        flavorLayer,
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
            new CanvasImageLayer(await loadPublicImage(NeutralEventFace.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(async () => {
        setLevelLayer(
            levelOverlays[face.level]
                ? new CanvasImageLayer(await loadPublicImage(levelOverlays[face.level]), new ImageTransform({
                    scale: 2,
                    x: face.level === "" ? 16 : 28,
                    y: face.level === "" ? 8 : 70
                }))
                : null
        );
    }, [face.level]);

    useEffect(async () => {
        setCostLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.cost)
                    .withX(76)
                    .withY(30)
                    .withFontSize(face.cost === "-" ? 60 : 64)
                    .withFontFamily(face.cost === "-" ? "AHCardTextSymbols" : "Teutonic")
                    .withColor("white")
                    .withStrokeWidth(5)
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.cost]);

    useEffect(() => {
        setCardTypeLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.cardType.toUpperCase())
                    .withX(76)
                    .withY(128)
                    .withFontSize(19)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(374)
                    .withY(607)
                    .withFontSize(50)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title]);

    useEffect(async () => {
        setSkillIcon1FrameLayer(
            skillIcons[face.skillIcon1]
                ? new CanvasImageLayer(await loadPublicImage(skillIconFrame), new ImageTransform({ scale: 2, x: 0, y: 160 }))
                : null
        );
        setSkillIcon1Layer(
            skillIcons[face.skillIcon1]
                ? new CanvasImageLayer(await loadPublicImage(skillIcons[face.skillIcon1]), new ImageTransform({ scale: 2, x: 30, y: 174 }))
                : null
        );
    }, [face.skillIcon1]);

    useEffect(async () => {
        setSkillIcon2FrameLayer(
            skillIcons[face.skillIcon2]
                ? new CanvasImageLayer(await loadPublicImage(skillIconFrame), new ImageTransform({ scale: 2, x: 0, y: 242 }))
                : null
        );
        setSkillIcon2Layer(
            skillIcons[face.skillIcon2]
                ? new CanvasImageLayer(await loadPublicImage(skillIcons[face.skillIcon2]), new ImageTransform({ scale: 2, x: 30, y: 256 }))
                : null
        );
    }, [face.skillIcon2]);

    useEffect(async () => {
        setSkillIcon3FrameLayer(
            skillIcons[face.skillIcon3]
                ? new CanvasImageLayer(await loadPublicImage(skillIconFrame), new ImageTransform({ scale: 2, x: 0, y: 324 }))
                : null
        );
        setSkillIcon3Layer(
            skillIcons[face.skillIcon3]
                ? new CanvasImageLayer(await loadPublicImage(skillIcons[face.skillIcon3]), new ImageTransform({ scale: 2, x: 30, y: 338 }))
                : null
        );
    }, [face.skillIcon3]);

    useEffect(async () => {
        setSkillIcon4FrameLayer(
            skillIcons[face.skillIcon4]
                ? new CanvasImageLayer(await loadPublicImage(skillIconFrame), new ImageTransform({ scale: 2, x: 0, y: 406 }))
                : null
        );
        setSkillIcon4Layer(
            skillIcons[face.skillIcon4]
                ? new CanvasImageLayer(await loadPublicImage(skillIcons[face.skillIcon4]), new ImageTransform({ scale: 2, x: 30, y: 420 }))
                : null
        );
    }, [face.skillIcon4]);

    useEffect(async () => {
        setSkillIcon5FrameLayer(
            skillIcons[face.skillIcon5]
                ? new CanvasImageLayer(await loadPublicImage(skillIconFrame), new ImageTransform({ scale: 2, x: 0, y: 488 }))
                : null
        );
        setSkillIcon5Layer(
            skillIcons[face.skillIcon5]
                ? new CanvasImageLayer(await loadPublicImage(skillIcons[face.skillIcon5]), new ImageTransform({ scale: 2, x: 30, y: 502 }))
                : null
        );
    }, [face.skillIcon5]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(676)
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
                    .withX((dy) => Math.max(50, 66 - 0.25 * dy, Math.min(84, 42 + 0.25 * dy)))
                    .withY(710)
                    .withWidth((dy) => Math.min(636, 620 + 0.5 * dy, Math.max(576, 650 - 0.5 * dy)))
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
                    .withX(88)
                    .withY(face.flavorNudgeDown)
                    .withWidth(576)
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
