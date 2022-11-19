import React from "react";
import CardFace from "../BlankFace/CardFace";
import treachery from "../../../../../public/templates/treacheries/treachery.png";
import TreacheryFaceView from "./TreacheryFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import TreacheryFaceCanvas from "./TreacheryFaceCanvas";

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
        this.cardType = face.cardType === null ? "Treachery" : face.cardType || "";
        this.title = face.title || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <TreacheryFaceView
                typeSelect={typeSelect}
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet, campaign, setIllustrationTransform) {
        return (
            <TreacheryFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "🗡";
    }
}
