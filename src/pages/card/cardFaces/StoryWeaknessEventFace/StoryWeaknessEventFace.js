import React from "react";
import CardFace from "../BlankFace/CardFace";
import eventWeakness from "../../../../../public/templates/events/eventWeakness.png";
import StoryWeaknessEventFaceView from "./StoryWeaknessEventFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import StoryWeaknessEventFaceCanvas from "./StoryWeaknessEventFaceCanvas";

export default class StoryWeaknessEventFace extends CardFace {
    static type = "Story Weakness (Event)";
    static frame = eventWeakness;

    constructor(face) {
        super(face, StoryWeaknessEventFace.type);
        if (!face) {
            face = {};
        }
        this.cost = face.cost || "";
        this.cardType = face.cardType === null ? "Event" : face.cardType || "";
        this.title = face.title || "";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.subType = face.subType === null ? "Weakness" : face.subType || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.campaignSymbol = face.campaignSymbol || null;
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSetId = face.campaignSetId || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <StoryWeaknessEventFaceView
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
            <StoryWeaknessEventFaceCanvas
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
