import React from "react";
import CardFace from "./CardFace";
import treachery from "../../../public/templates/treacheries/treachery.png";
import TreacheryFaceView from "../../pages/card/cardFaceViews/TreacheryFaceView";

export default class TreacheryFace extends CardFace {
    static type = "Treachery";
    static frame = treachery;

    constructor(face) {
        super(TreacheryFace.type);
        if (!face) {
            this.campaignSymbol = null;
            this.encounterSetSymbol = null;
            this.illustration = null;
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
    }

    getView(face, campaign, setCampaign) {
        return <TreacheryFaceView face={face} campaign={campaign} setCampaign={setCampaign} />;
    }
}
