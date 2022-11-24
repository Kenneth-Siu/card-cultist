import React from "react";
import ImageTransform from "../../../../models/ImageTransform";
import BlankFaceCanvas from "./BlankFaceCanvas";
import BlankFaceView from "./BlankFaceView";

export default class CardFace {
    static type = "None";
    static frame = null;

    constructor(face, type) {
        this.type = type || CardFace.type;
        Object.assign(this, face);
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet, campaign, setCampaign) {
        return (
            <BlankFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId) {
        return <BlankFaceCanvas key={cardId} />;
    }

    getEmoji() {
        return "";
    }

    autofillIllustration(other) {
        if (!this.illustration && other.illustration) {
            this.illustration = other.illustration;
            this.illustrationTransform = new ImageTransform(other.illustrationTransform);
            this.illustrator = other.illustrator;
        }
    }

    autofillField(fieldName, other) {
        if (!this[fieldName] && other[fieldName]) {
            this[fieldName] = other[fieldName];
        }
    }
}
