import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import AssetFace from "./AssetFace";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import healthIcons from "../../../../../public/templates/health/health";
import sanityIcons from "../../../../../public/templates/sanity/sanity";
import slotIcons from "../../../../../public/templates/slots/slots";
import skillIcons from "../../../../../public/templates/skillIcons/skillIcons";
import skillIconFrame from "../../../../../public/templates/skillBoxes/neutral.png";

export default function AssetFaceCanvas({ face, cardSet, campaign, setIllustrationTransform }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [subtitleFrameLayer, setSubtitleFrameLayer] = useState(null);
    const [costLayer, setCostLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
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
    const [healthLayer, setHealthLayer] = useState(null);
    const [sanityLayer, setSanityLayer] = useState(null);
    const [slot1Layer, setSlot1Layer] = useState(null);
    const [slot2Layer, setSlot2Layer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        subtitleFrameLayer,
        costLayer,
        cardTypeLayer,
        titleLayer,
        subtitleLayer,
        encounterSetSymbolLayer,
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
        healthLayer,
        sanityLayer,
        slot1Layer,
        slot2Layer,
        illustratorLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(
            image
                ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform))
                : null
        );
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(
                await loadPublicImage(AssetFace.frame),
                new ImageTransform({ scale: 2 })
            )
        );
    }, []);

    useEffect(async () => {
        setSubtitleFrameLayer(
            face.subtitle
                ? new CanvasImageLayer(
                      await loadPublicImage(AssetFace.subtitle),
                      new ImageTransform({ scale: 2, x: 160, y: 82 })
                  )
                : null
        );
    }, [face.subtitle]);

    useEffect(async () => {
        setCostLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.cost)
                    .withX(76)
                    .withY(face.cost === "-" ? 84 : 80)
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
                    .withY(140)
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
                    .withY(66)
                    .withFontSize(52)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title]);

    useEffect(() => {
        setSubtitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.subtitle)
                    .withX(374)
                    .withY(110)
                    .withFontSize(28)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.subtitle]);

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
                          x: 658 + (transform ? transform.xNudge : 0),
                          y: 20 + (transform ? transform.yNudge : 0),
                          scale:
                              (transform && transform.scale) ||
                              58 / Math.max(image.height, image.width),
                      })
                  )
                : null
        );
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(async () => {
        setSkillIcon1FrameLayer(
            skillIcons[face.skillIcon1]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIconFrame),
                      new ImageTransform({ scale: 2, x: 0, y: 160 })
                  )
                : null
        );
        setSkillIcon1Layer(
            skillIcons[face.skillIcon1]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIcons[face.skillIcon1]),
                      new ImageTransform({ scale: 2, x: 30, y: 174 })
                  )
                : null
        );
    }, [face.skillIcon1]);

    useEffect(async () => {
        setSkillIcon2FrameLayer(
            skillIcons[face.skillIcon2]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIconFrame),
                      new ImageTransform({ scale: 2, x: 0, y: 242 })
                  )
                : null
        );
        setSkillIcon2Layer(
            skillIcons[face.skillIcon2]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIcons[face.skillIcon2]),
                      new ImageTransform({ scale: 2, x: 30, y: 256 })
                  )
                : null
        );
    }, [face.skillIcon2]);

    useEffect(async () => {
        setSkillIcon3FrameLayer(
            skillIcons[face.skillIcon3]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIconFrame),
                      new ImageTransform({ scale: 2, x: 0, y: 324 })
                  )
                : null
        );
        setSkillIcon3Layer(
            skillIcons[face.skillIcon3]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIcons[face.skillIcon3]),
                      new ImageTransform({ scale: 2, x: 30, y: 338 })
                  )
                : null
        );
    }, [face.skillIcon3]);

    useEffect(async () => {
        setSkillIcon4FrameLayer(
            skillIcons[face.skillIcon4]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIconFrame),
                      new ImageTransform({ scale: 2, x: 0, y: 406 })
                  )
                : null
        );
        setSkillIcon4Layer(
            skillIcons[face.skillIcon4]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIcons[face.skillIcon4]),
                      new ImageTransform({ scale: 2, x: 30, y: 420 })
                  )
                : null
        );
    }, [face.skillIcon4]);

    useEffect(async () => {
        setSkillIcon5FrameLayer(
            skillIcons[face.skillIcon5]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIconFrame),
                      new ImageTransform({ scale: 2, x: 0, y: 488 })
                  )
                : null
        );
        setSkillIcon5Layer(
            skillIcons[face.skillIcon5]
                ? new CanvasImageLayer(
                      await loadPublicImage(skillIcons[face.skillIcon5]),
                      new ImageTransform({ scale: 2, x: 30, y: 502 })
                  )
                : null
        );
    }, [face.skillIcon5]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(664)
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
                    .withX(36)
                    .withY(702)
                    .withWidth(678)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withLineHeight(1.05)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    useEffect(async () => {
        setHealthLayer(
            face.health
                ? new CanvasImageLayer(
                      await loadPublicImage(
                          face.health === "-"
                              ? healthIcons[0]
                              : healthIcons[Number.parseInt(face.health)]
                      ),
                      new ImageTransform({ scale: 1.8, x: 298, y: 936 })
                  )
                : null
        );
    }, [face.health]);

    useEffect(async () => {
        setSanityLayer(
            face.sanity
                ? new CanvasImageLayer(
                      await loadPublicImage(
                          face.sanity === "-"
                              ? sanityIcons[0]
                              : sanityIcons[Number.parseInt(face.sanity)]
                      ),
                      new ImageTransform({ scale: 1.8, x: 396, y: 942 })
                  )
                : null
        );
    }, [face.sanity]);

    useEffect(async () => {
        setSlot1Layer(
            slotIcons[face.slot1]
                ? new CanvasImageLayer(
                      await loadPublicImage(slotIcons[face.slot1]),
                      new ImageTransform({ scale: 1.7, x: face.slot2 ? 516 : 620, y: 912 })
                  )
                : null
        );
    }, [face.slot1, face.slot2]);

    useEffect(async () => {
        setSlot2Layer(
            slotIcons[face.slot2]
                ? new CanvasImageLayer(
                      await loadPublicImage(slotIcons[face.slot2]),
                      new ImageTransform({ scale: 1.7, x: 620, y: 912 })
                  )
                : null
        );
    }, [face.slot2]);

    useEffect(() => {
        setIllustratorLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.illustrator ? "Illus. " + face.illustrator : "")
                    .withX(36)
                    .withY(1042)
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
                    .withY(1042)
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
                    .withY(1042)
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
                          scale:
                              (transform && transform.scale) ||
                              28 / Math.max(image.height, image.width),
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
                    .withY(1042)
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
