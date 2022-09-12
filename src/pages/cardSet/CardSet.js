import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLoadedImages from "../../helpers/useLoadedImages";
import "./CardSet.scss";

export default function CardSet({ campaign, setCampaign }) {
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();

    const params = useParams();
    const id = parseInt(params.id);
    const cardSet = campaign.getCardSet(id);

    useEffect(() => {
        loadFileSystemImage(cardSet.symbol);
    }, [cardSet.symbol]);

    if (!cardSet) {
        return (
            <main className="card-set-page">
                <p>Something went wrong!</p>
            </main>
        );
    }

    return (
        <main className="card-set-page">
            <input type="text" value={cardSet.title} onChange={(event) => changeTitle(event.target.value)} />
            <button onClick={() => changeSetSymbol()}>Choose set symbol</button>
            {cardSet.symbol && loadedImages.length > 0 ? loadedImages[loadedImages.length - 1] : ""}
        </main>
    );

    function changeTitle(title) {
        cardSet.title = title;
        setCampaign(campaign.clone());
    }

    // TODO doesn't work with SVGs
    async function changeSetSymbol() {
        const path = await window.fs.chooseIcon();
        cardSet.symbol = path;
        setCampaign(campaign.clone());
    }
}