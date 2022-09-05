import React, { useEffect, useRef, useState } from "react";
import CanvasTextLayer from "../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../models/CanvasTextConfig";
import treacheryFrame from "../../../../public/templates/treacheries/treachery.png";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";

export default function TreacheryFaceView({ face, campaign, setCampaign }) {
    const canvas = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);

    const [illustrationLayer, setIllustrationLayer] = useState(null);
    const [frameLayer, setFrameLayer] = useState(null);
    const [titleLayer, setTitleLayer] = useState(null);
    const [textLayer, setTextLayer] = useState(null);

    const canvasLayers = [illustrationLayer, frameLayer, titleLayer, textLayer];

    useEffect(() => {
        if (canvas.current) {
            refreshCanvas();
        }
    }, canvasLayers);

    useEffect(() => {
        addImage((image) => setFrameLayer(new CanvasImageLayer(image, 0, 0)), treacheryFrame, 750, 1050);
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
                <button onClick={() => addImage((image) => setIllustrationLayer(new CanvasImageLayer(image, 0, 0)))}>
                    Add illustration
                </button>
            </div>
            <canvas ref={canvas} id="preview" width="375" height="525" onLoad={() => refreshCanvas()}></canvas>
            <div className="loaded-images">{loadedImages}</div>
        </div>
    );

    function refreshCanvas() {
        const context = canvas.current.getContext("2d");
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        canvasLayers.forEach((canvasLayer) => {
            canvasLayer && canvasLayer.draw(context);
        });
    }

    function changeTitle(title) {
        face.title = title;
        setCampaign(campaign.clone());
    }

    function changeText(text) {
        face.text = text;
        setCampaign(campaign.clone());
    }

    async function addImage(callback, src, width, height) {
        if (!src) {
            const { data } = await window.fs.openImage();
            src = URL.createObjectURL(new Blob([data]));
        }
        const imageRef = React.createRef();

        setLoadedImages((loadedImages) => [
            ...loadedImages,
            <img
                key={loadedImages.length}
                ref={imageRef}
                src={src}
                width={width !== undefined ? `${width}` : ""}
                height={height !== undefined ? `${height}` : ""}
                onLoad={() => callback(imageRef.current)}
            />,
        ]);
    }
}
