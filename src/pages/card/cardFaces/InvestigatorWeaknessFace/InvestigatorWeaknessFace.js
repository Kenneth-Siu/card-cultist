import React from "react";
import CardFace from "../BlankFace/CardFace";
import treacheryWeakness from "../../../../../public/templates/treacheries/treacheryWeakness.png";
import InvestigatorWeaknessFaceView from "./InvestigatorWeaknessFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import InvestigatorWeaknessFaceCanvas from "./InvestigatorWeaknessFaceCanvas";

export default class InvestigatorWeaknessFace extends CardFace {
    static type = "Investigator Weakness (Treachery)";
    static frame = treacheryWeakness;

    constructor(face) {
        super(face, InvestigatorWeaknessFace.type);
        if (!face) {
            face = {};
        }
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.cardType = face.cardType === null ? "Treachery" : face.cardType || "";
        this.title = face.title || "";
        this.subType = face.subType === null ? "Weakness" : face.subType || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <InvestigatorWeaknessFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <InvestigatorWeaknessFaceCanvas
                face={this}
                cardSet={cardSet}
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
        this.autofillIllustration(other);
    }
}
