import React from "react";
import CardFace from "./CardFace";
import treachery from "../../../public/templates/treacheries/treachery.png";
import TreacheryFaceView from "../../pages/card/cardFaceViews/TreacheryFaceView";
import ImageTransform from "../ImageTransform";

export default class TreacheryFace extends CardFace {
    static type = "Treachery";
    static frame = treachery;

    constructor(face) {
        super(face, TreacheryFace.type);
        if (!face) {
            face = {};
        }
        this.campaignSymbol = face.campaignSymbol || null;
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.cardType = face.cardType || TreacheryFace.type;
        this.title = face.title || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(typeSelect, face, cardSet, campaign, setCampaign) {
        return (
            <TreacheryFaceView
                typeSelect={typeSelect}
                face={face}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }
}
