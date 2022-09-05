import React, { useEffect, useRef, useState } from "react";
import CanvasTextLayer from "../../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../../models/CanvasTextConfig";
import treacheryFrame from "../../../../public/templates/treacheries/treachery.png";
import CanvasImageLayer from "../../../models/canvasLayers/CanvasImageLayer";
import TreacheryFace from "../../../models/cardFaces/TreacheryFace";

const textBoxText = "Revelation – Test <wil> (3). For each point you fail by, take 1 horror.";

export default function TreacheryFaceView({ face, campaign, setCampaign }) {
    const canvas = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);
    const [canvasLayers, setCanvasLayers] = useState([]);

    useEffect(() => {
        if (canvas.current) {
            refreshCanvas();
        }
    }, [canvasLayers]);

    return (
        <div>
            <input type="text" value={face.title} onChange={(event) => changeTitle(event.target.value)} />
            <div>
                <button
                    onClick={() => {
                        addImage();
                    }}
                >
                    Add image
                </button>
                <button
                    onClick={() => {
                        addImage(treacheryFrame, 750, 1050);
                    }}
                >
                    Add frame
                </button>
                <button
                    onClick={() => {
                        setCanvasLayers((canvasLayers) => [
                            ...canvasLayers,
                            new CanvasTextLayer(
                                new CanvasTextConfig()
                                    .withText("Rotting Remains")
                                    .withX(187)
                                    .withY(326)
                                    .withFontSize(23)
                                    .withFontFamily("Teutonic")
                                    .withAlign("center")
                            ),
                        ]);
                    }}
                >
                    Add title
                </button>
                <button
                    onClick={() => {
                        setCanvasLayers((canvasLayers) => [
                            ...canvasLayers,
                            new CanvasTextLayer(
                                new CanvasTextConfig().withText(textBoxText).withX(31).withY(370).withWidth(325)
                            ),
                        ]);
                    }}
                >
                    Add text box
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
            canvasLayer.draw(context);
        });
    }

    function changeTitle(title) {
        face = new TreacheryFace();
        face.title = title;
        setCampaign(campaign.clone());
    }

    async function addImage(src, width, height) {
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
                onLoad={() => {
                    setCanvasLayers((canvasLayers) => [...canvasLayers, new CanvasImageLayer(imageRef.current, 0, 0)]);
                }}
            />,
        ]);
    }
}
