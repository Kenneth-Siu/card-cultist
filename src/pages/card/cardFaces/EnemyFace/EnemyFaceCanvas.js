import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN, VERTICAL_TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import EnemyFace from "./EnemyFace";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import EnemyDamageLayer from "../../../../models/canvasLayers/cardLayers/enemyDamage/EnemyDamageLayer";
import EnemyHorrorLayer from "../../../../models/canvasLayers/cardLayers/enemyHorror/EnemyHorrorLayer";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function EnemyFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [fightLayer, setFightLayer] = useState(null);
    const [healthLayer, setHealthLayer] = useState(null);
    const [evadeLayer, setEvadeLayer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [victoryLayer, setVictoryLayer] = useState(null);
    const [damageLayer, setDamageLayer] = useState(null);
    const [horrorLayer, setHorrorLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        titleLayer,
        subtitleLayer,
        fightLayer,
        healthLayer,
        evadeLayer,
        traitsLayer,
        textLayer,
        victoryLayer,
        damageLayer,
        horrorLayer,
        encounterSetSymbolLayer,
        cardTypeLayer,
        illustratorLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        EnemyDamageLayer.damageImage = await loadPublicImage(EnemyFace.damageImage);
        EnemyHorrorLayer.horrorImage = await loadPublicImage(EnemyFace.horrorImage);
        // TODO update state
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null);
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        if (face.subtitle) {
            setFrameLayer(new CanvasImageLayer(await loadPublicImage(EnemyFace.frameSubtitle), new ImageTransform({ scale: 2 })));
        } else {
            setFrameLayer(new CanvasImageLayer(await loadPublicImage(EnemyFace.frame), new ImageTransform({ scale: 2 })));
        }
    }, [!!face.subtitle]);

    useEffect(() => {
        // TODO Do proper unique star
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText((face.isUnique ? "<raised=-8><star></raised>" : "") + face.title)
                    .withX(374)
                    .withY(10)
                    .withFontSize(52)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.title, face.isUnique]);

    useEffect(() => {
        setSubtitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig().withText(face.subtitle).withX(374).withY(70).withFontSize(28).withAlign(TEXTALIGN.CENTER).withBold()
            )
        );
    }, [face.subtitle]);

    useEffect(async () => {
        setFightLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.fight)
                    .withX(240)
                    .withY(120)
                    .withFontSize(38)
                    .withFontFamily("AHCardTextSymbols")
                    .withColor("white")
                    .withAlign(TEXTALIGN.CENTER)
                    .withStrokeStyle("black")
                    .withStrokeWidth(3)
            )
        );
    }, [face.fight]);

    useEffect(async () => {
        setHealthLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.health + (face.healthIsPer ? "<raised=2><size=30>r</size></raised>" : ""))
                    .withX(378 + (face.healthIsPer ? 6 : 0))
                    .withY(114)
                    .withFontSize(46)
                    .withFontFamily("AHCardTextSymbols")
                    .withColor("white")
                    .withAlign(TEXTALIGN.CENTER)
                    .withStrokeStyle("black")
                    .withStrokeWidth(3)
            )
        );
    }, [face.health, face.healthIsPer]);

    useEffect(async () => {
        setEvadeLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.evade)
                    .withX(520)
                    .withY(120)
                    .withFontSize(38)
                    .withFontFamily("AHCardTextSymbols")
                    .withColor("white")
                    .withAlign(TEXTALIGN.CENTER)
                    .withStrokeStyle("black")
                    .withStrokeWidth(3)
            )
        );
    }, [face.evade]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(210)
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
                    .withX((dy) => Math.max(38, 90 - 4 * dy, 1.05 * dy - 134))
                    .withY(250)
                    .withWidth(674)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
            )
        );
    }, [face.title, face.text, face.textFontSize]);

    useEffect(() => {
        setVictoryLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.victory)
                    .withX(38)
                    .withY(252)
                    .withWidth(674)
                    .withHeight(284)
                    .withFontSize(face.textFontSize)
                    .withBold()
                    .withAlign(TEXTALIGN.CENTER)
                    .withVerticalAlign(VERTICAL_TEXTALIGN.BOTTOM)
            )
        );
    }, [face.victory, face.textFontSize]);

    useEffect(() => {
        setDamageLayer(new EnemyDamageLayer(face.damage));
    }, [face.damage]);

    useEffect(() => {
        setHorrorLayer(new EnemyHorrorLayer(face.horror));
    }, [face.horror]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        const transform = isSvgPath(face.encounterSetSymbol || cardSet.symbol)
            ? transformSvgOnCanvas({ h: CARD_PORTRAIT_HEIGHT, w: CARD_PORTRAIT_WIDTH }, { h: image.height, w: image.width }, 58)
            : null;
        setEncounterSetSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 346 + (transform ? transform.xNudge : 0),
                          y: 546 + (transform ? transform.yNudge : 0),
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
                    .withText(face.cardType.toUpperCase())
                    .withX(374)
                    .withY(617)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

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
                ? face.encounterSetId + String.fromCharCode(8202) + "/" + String.fromCharCode(8202) + face.encounterSetMaxId
                : "";
        setEncounterSetIdLayer(
            new CanvasTextLayer(
                new CanvasTextConfig().withText(text).withX(602).withY(1026).withFontSize(18).withAlign(TEXTALIGN.RIGHT).withColor("white")
            )
        );
    }, [face.encounterSetId, face.encounterSetMaxId]);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.campaignSymbol || campaign.symbol);
        const transform = isSvgPath(face.campaignSymbol || campaign.symbol)
            ? transformSvgOnCanvas({ h: CARD_PORTRAIT_HEIGHT, w: CARD_PORTRAIT_WIDTH }, { h: image.height, w: image.width }, 28)
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
