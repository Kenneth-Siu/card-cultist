import React, { useContext, useEffect } from "react";
import useLoadedImages from "../../../../helpers/useLoadedImages";
import WidgetView from "../WidgetView";
import SymbolsRowWidget from "./SymbolsRowWidget";
import remove from "lodash.remove";
import "./SymbolsRowWidgetView.scss";
import { CampaignContext } from "../../../../components/CampaignContext";

export default function SymbolsRowWidgetView({ widget, page }) {
    const { refreshCampaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    useEffect(async () => {
        await Promise.all(
            widget.paths.map(async (path) => {
                const image = await loadFileSystemImage(path);
                SymbolsRowWidget.dictionary[path] = image;
                return;
            })
        );
        refreshCampaign();
    }, []);

    return (
        <WidgetView widget={widget} page={page} className="symbols-row-widget-view">
            <div className="input-container">
                <label>Spacing</label>
                <input type="number" step="1" min="0" value={widget.spacing} onChange={(event) => setSpacing(parseInt(event.target.value))} />
            </div>
            <div className="input-container symbols-list">
                {widget.paths.map((path) => (
                    <div key={path}>
                        <label>{path}</label>
                        <button onClick={() => deleteSymbol(path)}>❌</button>
                    </div>
                ))}
                <button onClick={() => addSymbol()}>Add Symbol</button>
            </div>
            <div className="loaded-images">{loadedImages}</div>
        </WidgetView>
    );

    function setSpacing(spacing) {
        widget.spacing = spacing;
        refreshCampaign();
    }

    async function deleteSymbol(path) {
        remove(widget.paths, (widgetPath) => widgetPath === path);
        refreshCampaign();
    }

    async function addSymbol() {
        const path = await window.fs.chooseIcon();
        widget.paths.push(path);
        const image = await loadFileSystemImage(path);
        SymbolsRowWidget.dictionary[path] = image;
        refreshCampaign();
    }
}
