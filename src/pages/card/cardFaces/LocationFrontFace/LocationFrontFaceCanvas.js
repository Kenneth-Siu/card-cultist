import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN, VERTICAL_TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import {
    connectionSymbols,
    noConnectionSymbol,
} from "../../../../models/canvasLayers/cardLayers/connectionSymbol/connectionSymbols";
import ConnectionSymbolLayer from "../../../../models/canvasLayers/cardLayers/connectionSymbol/ConnectionSymbolLayer";
import ConnectionSymbolConfig from "../../../../models/canvasLayers/cardLayers/connectionSymbol/ConnectionSymbolConfig";
import connectionSymbolBackground from "../../../../../public/overlays/AHLCG-LocationCircle.png";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function LocationFrontFaceCanvas({ face, cardSet, setIllustrationTransform }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [connectionSymbolBackgroundLayer, setConnectionSymbolBackgroundLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [shroudLayer, setShroudLayer] = useState(null);
    const [cluesLayer, setCluesLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [flavorLayer, setFlavorLayer] = useState(null);
    const [victoryLayer, setVictoryLayer] = useState(null);
    const [connectionSymbolLayer, setConnectionSymbolLayer] = useState(null);
    const [connection1Layer, setConnection1Layer] = useState(null);
    const [connection2Layer, setConnection2Layer] = useState(null);
    const [connection3Layer, setConnection3Layer] = useState(null);
    const [connection4Layer, setConnection4Layer] = useState(null);
    const [connection5Layer, setConnection5Layer] = useState(null);
    const [connection6Layer, setConnection6Layer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        connectionSymbolBackgroundLayer,
        titleLayer,
        subtitleLayer,
        encounterSetSymbolLayer,
        cardTypeLayer,
        shroudLayer,
        cluesLayer,
        traitsLayer,
        textLayer,
        flavorLayer,
        victoryLayer,
        connectionSymbolLayer,
        connection1Layer,
        connection2Layer,
        connection3Layer,
        connection4Layer,
        connection5Layer,
        connection6Layer,
        illustratorLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        connectionSymbols.map(async (symbol) => {
            symbol.image = await loadPublicImage(symbol.icon);
        });
        // TODO update state
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(
            image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null
        );
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        if (face.subtitle) {
            setFrameLayer(
                new CanvasImageLayer(
                    await loadPublicImage(face.frameSubtitle),
                    new ImageTransform({ scale: 2 })
                )
            );
        } else {
            setFrameLayer(
                new CanvasImageLayer(await loadPublicImage(face.frame), new ImageTransform({ scale: 2 }))
            );
        }
    }, [!!face.subtitle, face.frame, face.frameSubtitle]);

    useEffect(async () => {
        setConnectionSymbolBackgroundLayer(
            face.connectionSymbol !== noConnectionSymbol.name
                ? new CanvasImageLayer(
                      await loadPublicImage(connectionSymbolBackground),
                      new ImageTransform({ x: 18, y: 2, scale: 2 })
                  )
                : null
        );
    }, [face.connectionSymbol]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(374)
                    .withY(8)
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
                    .withY(80)
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
                          x: 347 + (transform ? transform.xNudge : 0),
                          y: 487 + (transform ? transform.yNudge : 0),
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
                    .withY(558)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

    useEffect(async () => {
        setShroudLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.shroud)
                    .withX(70)
                    .withY(536)
                    .withFontSize(52)
                    .withFontFamily("AHCardTextSymbols")
                    .withColor("white")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
    }, [face.shroud]);

    useEffect(async () => {
        setCluesLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.clues + (face.cluesIsPer ? "<raised=-8><size=34>r</size></raised>" : ""))
                    .withX(684 + (face.cluesIsPer ? 4 : 0))
                    .withY(536)
                    .withFontSize(52)
                    .withFontFamily("AHCardTextSymbols")
                    .withColor("black")
                    .withAlign(TEXTALIGN.CENTER)
                    .withStrokeStyle("white")
                    .withStrokeWidth(3)
            )
        );
    }, [face.clues, face.cluesIsPer]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(604)
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
                    .withX((dy) => Math.max(40, 80 - 4 * dy))
                    .withY(638)
                    .withWidth((dy) => Math.min(670, 590 + 8 * dy))
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withCardSubtitle(face.subtitle)
            )
        );
    }, [face.title, face.subtitle, face.text, face.textFontSize]);

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
                    .withCardSubtitle(face.subtitle)
                    .withItalic()
                    .withAlign(TEXTALIGN.CENTER)
            ).withPrevY()
        );
    }, [face.title, face.subtitle, face.text, face.textFontSize, face.flavor, face.flavorNudgeDown]);

    useEffect(() => {
        setVictoryLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.victory)
                    .withX(40)
                    .withY(636)
                    .withWidth(686)
                    .withHeight(286)
                    .withFontSize(face.textFontSize)
                    .withBold()
                    .withAlign(TEXTALIGN.RIGHT)
                    .withVerticalAlign(VERTICAL_TEXTALIGN.BOTTOM)
            )
        );
    }, [face.victory, face.textFontSize]);

    useEffect(async () => {
        setConnectionSymbolLayer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connectionSymbol).withX(30.5).withY(13))
        );
    }, [face.connectionSymbol]);

    useEffect(async () => {
        setConnection1Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection1).withX(135.5).withY(935.5))
        );
    }, [face.connection1]);

    useEffect(async () => {
        setConnection2Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection2).withX(218).withY(920))
        );
    }, [face.connection2]);

    useEffect(async () => {
        setConnection3Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection3).withX(300.5).withY(913))
        );
    }, [face.connection3]);

    useEffect(async () => {
        setConnection4Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection4).withX(383).withY(913))
        );
    }, [face.connection4]);

    useEffect(async () => {
        setConnection5Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection5).withX(465.5).withY(920))
        );
    }, [face.connection5]);

    useEffect(async () => {
        setConnection6Layer(
            new ConnectionSymbolLayer(new ConnectionSymbolConfig(face.connection6).withX(548).withY(935.5))
        );
    }, [face.connection6]);

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
