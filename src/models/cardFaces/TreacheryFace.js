import React from "react";
import CardFace from "./CardFace";
import treachery from "../../../public/templates/treacheries/treachery.png";
import TreacheryFaceView from "../../pages/card/cardFaceViews/TreacheryFaceView";
import ImageTransform from "../ImageTransform";

export default class TreacheryFace extends CardFace {
    static type = "Treachery";
    static frame = treachery;

    constructor(face) {
        super(TreacheryFace.type);
        if (!face) {
            this.campaignSymbol = null;
            this.encounterSetSymbol = null;
            this.illustration = null;
            this.illustrationTransform = new ImageTransform();
            this.title = "";
            this.text = "";
            this.illustrator = "";
            this.copyrightInformation = "";
            this.encounterSetId = null;
            this.encounterSetMaxId = null;
            this.campaignSetId = null;
            return;
        }
        Object.assign(this, face);
        this.illustrationTransform = new ImageTransform(this.illustrationTransform);
    }

    getView(face, cardSet, campaign, setCampaign) {
        return <TreacheryFaceView face={face} cardSet={cardSet} campaign={campaign} setCampaign={setCampaign} />;
    }
}
