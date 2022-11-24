import React from "react";
import CardFace from "../BlankFace/CardFace";
import treacheryWeakness from "../../../../../public/templates/treacheries/treacheryWeakness.png";
import ahlcgBasicWeakness from "../../../../../public/overlays/AHLCG-BasicWeakness.png";
import StoryWeaknessFaceView from "./StoryWeaknessFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import StoryWeaknessFaceCanvas from "./StoryWeaknessFaceCanvas";

export default class StoryWeaknessFace extends CardFace {
    static type = "Story Weakness (Treachery)";
    static frame = treacheryWeakness;
    static encounterSetIconFrame = ahlcgBasicWeakness;

    constructor(face) {
        super(face, StoryWeaknessFace.type);
        if (!face) {
            face = {};
        }
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.cardType = face.cardType === null ? "Treachery" : face.cardType || "";
        this.title = face.title || "";
        this.subType = face.subType === null ? "Weakness" : face.subType || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet, campaign, setCampaign) {
        return (
            <StoryWeaknessFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet, campaign, setIllustrationTransform) {
        return (
            <StoryWeaknessFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "🧪";
    }

    autofill(other) {
        this.autofillField("title", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("encounterSetSymbol", other);
        this.autofillIllustration(other);
    }
}
