import React from "react";
import CardFace from "../BlankFace/CardFace";
import neutralEvent from "../../../../../public/templates/events/eventNeutral.png";
import NeutralEventFaceView from "./NeutralEventFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import NeutralEventFaceCanvas from "./NeutralEventFaceCanvas";

export default class NeutralEventFace extends CardFace {
    static type = "Event (Neutral)";
    static frame = neutralEvent;

    constructor(face) {
        super(face, NeutralEventFace.type);
        if (!face) {
            face = {};
        }
        this.cost = face.cost || "";
        this.level = face.level || "";
        this.cardType = face.cardType === null ? "Event" : face.cardType || "";
        this.title = face.title || "";
        this.skillIcon1 = face.skillIcon1 || "";
        this.skillIcon2 = face.skillIcon2 || "";
        this.skillIcon3 = face.skillIcon3 || "";
        this.skillIcon4 = face.skillIcon4 || "";
        this.skillIcon5 = face.skillIcon5 || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.campaignSymbol = face.campaignSymbol || null;
        this.copyrightInformation = face.copyrightInformation || "";
        this.campaignSetId = face.campaignSetId || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <NeutralEventFaceView
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
            <NeutralEventFaceCanvas
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
        this.autofillField("subtitle", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("encounterSetSymbol", other);
        this.autofillIllustration(other);
    }
}
