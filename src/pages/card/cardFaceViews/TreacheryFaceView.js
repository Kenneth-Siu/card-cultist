import React, { useEffect, useState } from "react";
import CanvasTextLayer from "../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig, { TEXTALIGN } from "../../../models/CanvasTextConfig";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import useLoadedImages from "../../../helpers/useLoadedImages";
import TreacheryFace from "../../../models/cardFaces/TreacheryFace";
import CardCanvas from "./CardCanvas";
import ImageTransform from "../../../models/ImageTransform";

export default function TreacheryFaceView({ face, cardSet, campaign, setCampaign }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [encounterSetSymbolLayer, setEncounterSetSymbolLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [illustrationLayer, frameLayer, encounterSetSymbolLayer, titleLayer, textLayer];

    useEffect(async () => {
        const image = await loadFileSystemImage(face.illustration);
        setIllustrationLayer(
            image ? new CanvasImageLayer(image, new ImageTransform(face.illustrationTransform)) : null
        );
    }, [face.illustration, ...Object.values(face.illustrationTransform)]);

    useEffect(async () => {
        setFrameLayer(
            new CanvasImageLayer(await loadPublicImage(TreacheryFace.frame), new ImageTransform({ scale: 2 }))
        );
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        setEncounterSetSymbolLayer(
            image ? new CanvasImageLayer(image, new ImageTransform({ x: 348, y: 506, scale: 58 / image.width })) : null
        );
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(374)
                    .withY(652)
                    .withFontSize(46)
                    .withFontFamily("Teutonic")
                    .withAlign(TEXTALIGN.CENTER)
            )
        );
        setTextLayer(
            new CanvasTextLayer(new CanvasTextConfig().withText(face.text).withX(62).withY(740).withWidth(650), face)
        );
    }, [face.title, face.text]);

    return (
        <div>
            <input type="text" value={face.title} onChange={(event) => setTitle(event.target.value)} />
            <textarea value={face.text} onChange={(event) => setText(event.target.value)} />
            <div>
                <button onClick={() => setEncounterSetSymbol()}>Change encounter set symbol</button>
                <button onClick={() => setIllustration()}>Change illustration</button>
                <label>
                    X Position
                    <input
                        type="number"
                        value={face.illustrationTransform.x}
                        onChange={(event) => setIllustrationX(event.target.value)}
                    />
                </label>
                <label>
                    Y Position
                    <input
                        type="number"
                        value={face.illustrationTransform.y}
                        onChange={(event) => setIllustrationY(event.target.value)}
                    />
                </label>
                <label>
                    Scale
                    <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={(face.illustrationTransform.scale * 100).toFixed(1)}
                        onChange={(event) => setIllustrationScale(event.target.value / 100)}
                    />
                </label>
                <label>
                    Rotation
                    <input
                        type="number"
                        value={face.illustrationTransform.rotation}
                        onChange={(event) => setIllustrationRotation(event.target.value)}
                    />
                </label>
            </div>
            <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />
        </div>
    );

    function setTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function setText(text) {
        face.text = text;
        setCampaign(campaign.clone());
    }

    async function setEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        setCampaign(campaign.clone());
    }

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        face.illustration = path;
        setCampaign(campaign.clone());
    }

    function setIllustrationX(x) {
        face.illustrationTransform.x = x;
        setCampaign(campaign.clone());
    }

    function setIllustrationY(y) {
        face.illustrationTransform.y = y;
        setCampaign(campaign.clone());
    }

    function setIllustrationScale(scale) {
        face.illustrationTransform.scale = scale;
        setCampaign(campaign.clone());
    }

    function setIllustrationRotation(rotation) {
        face.illustrationTransform.rotation = rotation;
        setCampaign(campaign.clone());
    }
}
