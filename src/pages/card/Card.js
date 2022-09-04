import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import treacheryFrame from "../../../public/templates/treacheries/treachery.png";
import CanvasImageLayer from "../../models/canvasLayers/CanvasImageLayer";
import CanvasTextLayer from "../../models/canvasLayers/CanvasTextLayer";
import CanvasTextConfig from "../../models/CanvasTextConfig";
import "./Card.scss";

const textBoxText = "Revelation – Test <wil> (3). For each point you fail by, take 1 horror.";

export default function Card({ campaign, setCampaign }) {
    const canvas = useRef(null);
    const [loadedImages, setLoadedImages] = useState([]);
    const [canvasLayers, setCanvasLayers] = useState([]);

    const params = useParams();

    const id = parseInt(params.id);
    const cardSetId = parseInt(params.cardSetId);

    const cardSet = campaign.getCardSet(cardSetId);
    const card = cardSet.getCard(id);

    useEffect(() => {
        if (canvas.current) {
            refreshCanvas();
        }
    }, [canvasLayers]);

    if (!card) {
        return (
            <main className="card-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-page">
            <input type="text" value={card.title} onChange={(event) => changeTitle(event.target.value)} />
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
                <button onClick={() => downloadOne()}>Download one</button>
                <button onClick={() => downloadAll()}>Download all</button>
            </div>
            <canvas ref={canvas} id="preview" width="375" height="525" onLoad={() => refreshCanvas()}></canvas>
            <div id="loaded-images">{loadedImages}</div>
        </main>
    );

    function refreshCanvas() {
        const context = canvas.current.getContext("2d");
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        canvasLayers.forEach((canvasLayer) => {
            canvasLayer.draw(context);
        });
    }

    function changeTitle(title) {
        card.title = title;
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

    function downloadOne() {
        canvas.current.toBlob((canvasBlob) => {
            saveAs(canvasBlob, "Rotting Remains.png");
        });
    }

    function downloadAll() {
        const zip = new JSZip();
        const strikingFear = zip.folder("Striking Fear");
        const promise1 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        const promise2 = new Promise((resolve, reject) => {
            canvas.current.toBlob((canvasBlob) => {
                resolve(canvasBlob);
            });
        });
        Promise.all([promise1, promise2]).then(([canvasBlob1, canvasBlob2]) => {
            strikingFear.file("Rotting Remains.png", canvasBlob1);
            strikingFear.file("Rotting Remains2.png", canvasBlob2);
            zip.generateAsync({ type: "blob" }).then((zipBlob) => {
                saveAs(zipBlob, "Darkham Horror.zip");
            });
        });
    }
}
