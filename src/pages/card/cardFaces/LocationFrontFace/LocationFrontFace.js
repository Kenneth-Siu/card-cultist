import React from "react";
import CardFace from "../BlankFace/CardFace";
import location from "../../../../../public/templates/locations/locationFront.png";
import locationSubtitle from "../../../../../public/templates/locations/locationSubtitleFront.png";
import LocationFrontFaceView from "./LocationFrontFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import LocationFrontFaceCanvas from "./LocationFrontFaceCanvas";
import { noConnectionSymbol } from "./connectionSymbols";

export default class LocationFrontFace extends CardFace {
    static type = "Location Front";
    static frame = location;
    static frameSubtitle = locationSubtitle;

    constructor(face) {
        super(face, LocationFrontFace.type);
        if (!face) {
            face = {};
        }
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.cardType = face.cardType || "Location";
        this.shroud = face.shroud || "";
        this.clues = face.clues || "";
        this.cluesIsPer = face.cluesIsPer || false;
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.victory = face.victory || "";
        this.textFontSize = face.textFontSize || 34;
        this.connectionSymbol = face.connectionSymbol || noConnectionSymbol.name;
        this.connection1 = face.connection1 || noConnectionSymbol.name;
        this.connection2 = face.connection2 || noConnectionSymbol.name;
        this.connection3 = face.connection3 || noConnectionSymbol.name;
        this.connection4 = face.connection4 || noConnectionSymbol.name;
        this.connection5 = face.connection5 || noConnectionSymbol.name;
        this.connection6 = face.connection6 || noConnectionSymbol.name;
        this.illustrator = face.illustrator || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <LocationFrontFaceView
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
            <LocationFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }
}
