import React from "react";
import CardFace from "../BlankFace/CardFace";
import location from "../../../../../public/templates/locations/locationBack.png";
import locationSubtitle from "../../../../../public/templates/locations/locationSubtitleBack.png";
import LocationBackFaceView from "./LocationBackFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import LocationBackFaceCanvas from "./LocationBackFaceCanvas";
import { noConnectionSymbol } from "../../../../models/canvasLayers/cardLayers/connectionSymbol/connectionSymbols";

export default class LocationBackFace extends CardFace {
    static type = "Location Back";
    static frame = location;
    static frameSubtitle = locationSubtitle;

    constructor(face, type) {
        super(face, type || LocationBackFace.type);
        if (!face) {
            face = {};
        }
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.cardType = face.cardType === null ? "Location" : face.cardType || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.connectionSymbol = face.connectionSymbol || noConnectionSymbol.name;
        this.connection1 = face.connection1 || noConnectionSymbol.name;
        this.connection2 = face.connection2 || noConnectionSymbol.name;
        this.connection3 = face.connection3 || noConnectionSymbol.name;
        this.connection4 = face.connection4 || noConnectionSymbol.name;
        this.connection5 = face.connection5 || noConnectionSymbol.name;
        this.connection6 = face.connection6 || noConnectionSymbol.name;
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.frame = location;
        this.frameSubtitle = locationSubtitle;
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <LocationBackFaceView
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
            <LocationBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "🏠";
    }

    autofill(other) {
        this.autofillField("title", other);
        this.autofillField("subtitle", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("victory", other);
        this.autofillField("encounterSetSymbol", other);
        this.autofillField("connectionSymbol", other);
        this.autofillField("connection1", other);
        this.autofillField("connection2", other);
        this.autofillField("connection3", other);
        this.autofillField("connection4", other);
        this.autofillField("connection5", other);
        this.autofillField("connection6", other);
        this.autofillIllustration(other);
    }
}
