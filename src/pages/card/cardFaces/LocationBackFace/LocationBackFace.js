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

    constructor(face) {
        super(face, LocationBackFace.type);
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
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <LocationBackFaceView
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
            <LocationBackFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }
}
