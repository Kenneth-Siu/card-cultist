import React, { useContext, useEffect } from "react";
import { CampaignContext } from "../../../../components/CampaignContext";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import WidgetView from "../WidgetView";
import IllustrationWidget from "./IllustrationWidget";

export default function IllustrationWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    useEffect(async () => {
        if (widget.path) {
            const image = await loadFileSystemImage(widget.path);
            IllustrationWidget.dictionary[widget.id] = image;
            refreshCampaign();
        }
    }, []);

    return (
        <WidgetView widget={widget} page={page} className="illustration-widget-view">
            <div className="input-container">
                <button onClick={() => setIllustration()}>Load Image</button>
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
            <div className="loaded-images">{loadedImages}</div>
        </WidgetView>
    );

    async function setIllustration() {
        const path = await window.fs.chooseImage();
        widget.path = path;
        const image = await loadFileSystemImage(path);
        IllustrationWidget.dictionary[widget.id] = image;
        refreshCampaign();
    }

    function setIllustrationTransform(transform) {
        widget.transform = transform;
        refreshCampaign();
    }

    function setIllustrationScale(scale) {
        setIllustrationTransform(widget.transform.withScale(scale));
    }

    function setIllustrationRotation(rotation) {
        setIllustrationTransform(widget.transform.withRotation(rotation));
    }
}
