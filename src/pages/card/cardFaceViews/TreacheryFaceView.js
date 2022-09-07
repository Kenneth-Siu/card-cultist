import React, { useEffect, useState } from "react";
import CanvasTextLayer from "../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../models/CanvasTextConfig";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import useLoadedImages from "../../../helpers/useLoadedImages";
import treacheryFrame from "../../../../public/templates/treacheries/treachery.png";
import CardCanvas from "./CardCanvas";

export default function TreacheryFaceView({ face, campaign, setCampaign }) {
    const [loadedImages, loadImage] = useLoadedImages();

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [illustrationLayer, frameLayer, titleLayer, textLayer];

    useEffect(async () => {
        setFrameLayer(new CanvasImageLayer(await loadImage(treacheryFrame, 750, 1050), 0, 0));
    }, []);

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
        setTextLayer(
            new CanvasTextLayer(new CanvasTextConfig().withText(face.text).withX(31).withY(370).withWidth(325))
        );
    }, [campaign]);

    return (
        <div>
            <input type="text" value={face.title} onChange={(event) => changeTitle(event.target.value)} />
            <input type="textarea" value={face.text} onChange={(event) => changeText(event.target.value)} />
            <div>
                <button onClick={async () => setIllustrationLayer(new CanvasImageLayer(await loadImage(), 0, 0))}>
                    Add illustration
                </button>
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
}
