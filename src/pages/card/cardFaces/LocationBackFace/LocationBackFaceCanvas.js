import React, { useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import LocationBackFace from "./LocationBackFace";
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

export default function LocationBackFaceCanvas({ face, cardSet, campaign, setIllustrationTransform }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [connectionSymbolBackgroundLayer, setConnectionSymbolBackgroundLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [cardTypeLayer, setCardTypeLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [subtitleLayer, setSubtitleLayer] = useState(null);
    const [traitsLayer, setTraitsLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);
    const [connectionSymbolLayer, setConnectionSymbolLayer] = useState(null);
    const [connection1Layer, setConnection1Layer] = useState(null);
    const [connection2Layer, setConnection2Layer] = useState(null);
    const [connection3Layer, setConnection3Layer] = useState(null);
    const [connection4Layer, setConnection4Layer] = useState(null);
    const [connection5Layer, setConnection5Layer] = useState(null);
    const [connection6Layer, setConnection6Layer] = useState(null);
    const [illustratorLayer, setIllustratorLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);

    const canvasLayers = [
        illustrationLayer,
        frameLayer,
        connectionSymbolBackgroundLayer,
        titleLayer,
        subtitleLayer,
        encounterSetSymbolLayer,
        cardTypeLayer,
        traitsLayer,
        textLayer,
        connectionSymbolLayer,
        connection1Layer,
        connection2Layer,
        connection3Layer,
        connection4Layer,
        connection5Layer,
        connection6Layer,
        illustratorLayer,
        copyrightInformationLayer,
        campaignSymbolLayer,
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
                    await loadPublicImage(LocationBackFace.frameSubtitle),
                    new ImageTransform({ scale: 2 })
                )
            );
        } else {
            setFrameLayer(
                new CanvasImageLayer(await loadPublicImage(LocationBackFace.frame), new ImageTransform({ scale: 2 }))
            );
        }
    }, [!!face.subtitle]);

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
                    .withY(48)
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
                    .withY(100)
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
                    .withY(574)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.cardType]);

    useEffect(() => {
        setTraitsLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.traits)
                    .withX(374)
                    .withY(624)
                    .withFontSize(28)
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
                    .withText(face.text - (face.traits ? 0 : 6))
                    .withX(40)
                    .withY(658)
                    .withWidth(670)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
                    .withCardSubtitle(face.subtitle)
            )
        );
    }, [face.title, face.subtitle, face.traits, face.text, face.textFontSize]);

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

    return (
        <CardCanvas
            loadedImages={loadedImages}
            canvasLayers={canvasLayers}
            illustrationTransform={face.illustrationTransform}
            setIllustrationTransform={setIllustrationTransform}
        />
    );
}
