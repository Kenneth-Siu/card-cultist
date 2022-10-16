import React, { useEffect } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import IllustrationWidget from "./IllustrationWidget";

export default function IllustrationWidgetView({ widget, page, campaign, setCampaign }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    useEffect(async () => {
        if (widget.path) {
            const image = await loadFileSystemImage(widget.path);
            IllustrationWidget.dictionary[widget.id] = image;
            setCampaign(campaign.clone());
        }
    }, []);

    return (
        <div className="illustration-widget-view">
            <div className="loaded-images">{loadedImages}</div>

            <div className="input-container">
                <label>Illustration</label>
                <button onClick={() => setIllustration()}>Load Image</button>
            </div>

            <div className="input-container">
                <label>X Nudge</label>
                <input
                    type="number"
                    step="1"
                    value={widget.xNudge}
                    onChange={(event) => setXNudge(parseInt(event.target.value))}
                />
            </div>

            <div className="input-container">
                <label>Y Nudge</label>
                <input
                    type="number"
                    step="1"
                    value={widget.yNudge}
                    onChange={(event) => setYNudge(parseInt(event.target.value))}
                />
            </div>

            <div className="input-container">
                <label>Scale</label>
                <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={(widget.transform.scale * 100).toFixed(2)}
                    onChange={(event) => setIllustrationScale(parseFloat(event.target.value / 100))}
                />
            </div>
            <div className="input-container">
                <label>Rotation</label>
                <input
                    type="number"
                    step="0.1"
                    value={widget.transform.rotation.toFixed(1)}
                    onChange={(event) => setIllustrationRotation(parseFloat(event.target.value))}
                />
            </div>

            <button onClick={() => deleteWidget()}>Delete</button>
        </div>
    );

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        widget.path = path;
        const image = await loadFileSystemImage(path);
        IllustrationWidget.dictionary[widget.id] = image;
        setCampaign(campaign.clone());
    }

    function setXNudge(xNudge) {
        widget.xNudge = xNudge;
        setCampaign(campaign.clone());
    }

    function setYNudge(yNudge) {
        widget.yNudge = yNudge;
        setCampaign(campaign.clone());
    }

    function setIllustrationTransform(transform) {
        widget.transform = transform;
        setCampaign(campaign.clone());
    }

    function setIllustrationScale(scale) {
        setIllustrationTransform(widget.transform.withScale(scale));
    }

    function setIllustrationRotation(rotation) {
        setIllustrationTransform(widget.transform.withRotation(rotation));
    }

    function deleteWidget() {
        page.deleteWidget(widget);
        setCampaign(campaign.clone());
    }
}
