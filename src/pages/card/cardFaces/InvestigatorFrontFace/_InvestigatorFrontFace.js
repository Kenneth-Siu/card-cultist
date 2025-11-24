import React from "react";
import CardFace from "../BlankFace/CardFace";
import ImageTransform from "../../../../models/ImageTransform";
import InvestigatorFrontFaceCanvas from "./InvestigatorFrontFaceCanvas";
import InvestigatorFrontFaceView from "./InvestigatorFrontFaceView";

export default class InvestigatorFrontFace extends CardFace {
    constructor(face, type, frame) {
        super(face, type);
        if (!face) {
            face = {};
        }
        this.isUnique = face.isUnique || false;
        this.frame = frame;
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.willpower = face.willpower || "";
        this.intellect = face.intellect || "";
        this.combat = face.combat || "";
        this.agility = face.agility || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.health = face.health || "";
        this.sanity = face.sanity || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <InvestigatorFrontFaceView
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
            <InvestigatorFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "👤";
    }
}
