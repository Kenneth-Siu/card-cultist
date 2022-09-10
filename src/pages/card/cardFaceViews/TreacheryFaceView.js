import React, { useEffect, useState } from "react";
import CanvasTextLayer from "../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../models/CanvasTextConfig";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import useLoadedImages from "../../../helpers/useLoadedImages";
import TreacheryFace from "../../../models/cardFaces/TreacheryFace";
import CardCanvas from "./CardCanvas";

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
        setIllustrationLayer(image ? new CanvasImageLayer(image, 0, 0) : null);
    }, [face.illustration]);

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadPublicImage(TreacheryFace.frame), 0, 0));
    }, []);

    useEffect(async () => {
        const image = await loadFileSystemImage(face.encounterSetSymbol || cardSet.symbol);
        setEncounterSetSymbolLayer(image ? new CanvasImageLayer(image, 174, 253, 29, 29) : null);
    }, [face.encounterSetSymbol, cardSet.symbol]);

    useEffect(() => {
        setTitleLayer(
            new CanvasTextLayer(
                new CanvasTextConfig()
                    .withText(face.title)
                    .withX(187)
                    .withY(326)
                    .withFontSize(23)
                    .withFontFamily("Teutonic")
                    .withAlign("center")
            )
        );
    }, [face.title]);

    useEffect(() => {
        setTextLayer(
            new CanvasTextLayer(new CanvasTextConfig().withText(face.text).withX(31).withY(370).withWidth(325))
        );
    }, [face.text]);

    return (
        <div>
            <input type="text" value={face.title} onChange={(event) => changeTitle(event.target.value)} />
            <input type="textarea" value={face.text} onChange={(event) => changeText(event.target.value)} />
            <div>
                <button onClick={() => changeEncounterSetSymbol()}>Change encounter set symbol</button>
                <button onClick={() => changeIllustration()}>Change illustration</button>
            </div>
            <CardCanvas loadedImages={loadedImages} canvasLayers={canvasLayers} />
        </div>
    );

    function changeTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function changeText(text) {
        face.text = text;
        setCampaign(campaign.clone());
    }

    async function changeEncounterSetSymbol() {
        const path = await window.fs.chooseIcon();
        face.encounterSetSymbol = path;
        setCampaign(campaign.clone());
    }

    async function changeIllustration() {
        const path = await window.fs.chooseImage();
        face.illustration = path;
        setCampaign(campaign.clone());
    }
}
