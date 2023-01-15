import React, { useContext, useEffect, useState } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import CanvasImageLayer from "../../../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN, UNDERLINE } from "../../../../models/CanvasTextConfig";
import ImageTransform from "../../../../models/ImageTransform";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace";
import CardCanvas from "../CardCanvas";
import { isSvgPath } from "../../../../helpers/isSvgPath";
import { transformSvgOnCanvas } from "../../../../helpers/transformSvgOnCanvas";
import { CARD_PORTRAIT_HEIGHT, CARD_PORTRAIT_WIDTH } from "../../cardConstants";
import ChaosTokenEffectsLayer from "../../../../models/canvasLayers/cardLayers/chaosTokenEffects/ChaosTokenEffectsLayer";
import ChaosTokenEffectsConfig from "../../../../models/canvasLayers/cardLayers/chaosTokenEffects/ChaosTokenEffectsConfig";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function ChaosTokenEffectsFaceCanvas({ face, cardSet }) {
    const { campaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [frameLayer, setFrameLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [difficultyLayer, setDifficultyLayer] = useState(null);
    const [chaosTokenEffectsLayer, setChaosTokenEffectsLayer] = useState(null);
    const [copyrightInformationLayer, setCopyrightInformationLayer] = useState(null);
    const [encounterSetIdLayer, setEncounterSetIdLayer] = useState(null);
    const [campaignSymbolLayer, setCampaignSymbolLayer] = useState(null);
    const [campaignSetIdLayer, setCampaignSetIdLayer] = useState(null);

    const canvasLayers = [
        frameLayer,
        encounterSetSymbolLayer,
        titleLayer,
        difficultyLayer,
        chaosTokenEffectsLayer,
        copyrightInformationLayer,
        encounterSetIdLayer,
        campaignSymbolLayer,
        campaignSetIdLayer,
    ];

    useEffect(async () => {
        const tokenImages = await Promise.all([
            loadPublicImage(ChaosTokenEffectsFace.skullTokenImage),
            loadPublicImage(ChaosTokenEffectsFace.cultistTokenImage),
            loadPublicImage(ChaosTokenEffectsFace.tabletTokenImage),
            loadPublicImage(ChaosTokenEffectsFace.elderThingTokenImage),
        ]);
        ChaosTokenEffectsLayer.skullTokenImage = tokenImages[0];
        ChaosTokenEffectsLayer.cultistTokenImage = tokenImages[1];
        ChaosTokenEffectsLayer.tabletTokenImage = tokenImages[2];
        ChaosTokenEffectsLayer.elderThingTokenImage = tokenImages[3];
        // TODO update state
    }, []);

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(await loadPublicImage(ChaosTokenEffectsFace.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        const transform = isSvgPath(face.encounterSetSymbol || cardSet.symbol)
            ? transformSvgOnCanvas(
                  { h: CARD_PORTRAIT_HEIGHT, w: CARD_PORTRAIT_WIDTH },
                  { h: image.height, w: image.width },
                  60
              )
            : null;
        setEncounterSetSymbolLayer(
            image
                ? new CanvasImageLayer(
                      image,
                      new ImageTransform({
                          x: 343 + (transform ? transform.xNudge : 0),
                          y: 113 + (transform ? transform.yNudge : 0),
                          scale: (transform && transform.scale) || 60 / Math.max(image.height, image.width),
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
                    .withX(374)
                    .withY(182)
                    .withFontSize(58)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
                    .withUnderline(UNDERLINE.DOUBLE)
            )
        );
    }, [face.title, face.skullText, face.cultistText, face.tabletText, face.elderThingText]);

    useEffect(() => {
        setDifficultyLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.difficulty.toUpperCase())
                    .withX(374)
                    .withY(254)
                    .withFontSize(24)
                    .withAlign(TEXTALIGN.CENTER)
                    .withBold()
            )
        );
    }, [face.difficulty]);

    useEffect(() => {
        setChaosTokenEffectsLayer(
            new ChaosTokenEffectsLayer(
                new ChaosTokenEffectsConfig()
                    .withText(face.text)
                    .withSkullText(face.skullText)
                    .withCultistText(face.cultistText)
                    .withTabletText(face.tabletText)
                    .withElderThingText(face.elderThingText)
                    .withX(94)
                    .withY(278)
                    .withWidth(562)
                    .withHeight(664)
                    .withFontSize(face.textFontSize)
                    .withCardTitle(face.title)
            )
        );
    }, [
        loadedImages,
        face.title,
        face.textFontSize,
        face.text,
        face.skullText,
        face.cultistText,
        face.tabletText,
        face.elderThingText,
    ]);

    useEffect(() => {
        setCopyrightInformationLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.copyrightInformation)
                    .withX(36)
                    .withY(1026)
                    .withFontSize(18)
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

    return <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />;
}
