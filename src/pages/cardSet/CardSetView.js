import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignContext } from "../../components/CampaignContext";
import useLoadedImages from "../../helpers/useLoadedImages";
import CardExporter from "./components/CardExporter";
import "./CardSetView.scss";
import SortableCardList from "./components/SortableCardList";

// TODO can export all cards in set individually with bleed (MPC friendly)
// TODO can export all front/back faces of cards in set with bleed (printer-friendly)

export default function CardSet() {
    const { campaign, refreshCampaign } = useContext(CampaignContext);
    const [loadedImages, loadPublicImage, loadFileSystemImage] = useLoadedImages();
    const history = useHistory();

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
            <div className="set-details-container">
                {cardSet.symbol && loadedImages.length > 0 ? loadedImages[loadedImages.length - 1] : ""}
                <input type="text" value={cardSet.title} onChange={(event) => setTitle(event.target.value)} />
                <button onClick={() => setSetSymbol()}>Choose set symbol</button>
            </div>
            <SortableCardList cardSet={cardSet} />
            <CardExporter cardSet={cardSet} />
            <button onClick={() => deleteSet()}>Delete Set</button>
        </main>
    );

    function setTitle(title) {
        cardSet.title = title;
        refreshCampaign();
    }

    async function setSetSymbol() {
        const path = await window.fs.chooseIcon();
        cardSet.symbol = path;
        refreshCampaign();
    }

    function deleteSet() {
        campaign.deleteCardSet(id);
        history.push("/");
        refreshCampaign();
    }
}
