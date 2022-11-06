import React from "react";
import CardFace from "../BlankFace/CardFace";
import treachery from "../../../../../public/templates/scenario/agendaFront.png";
import AgendaFrontFaceView from "./AgendaFrontFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import AgendaFrontFaceCanvas from "./AgendaFrontFaceCanvas";

export default class AgendaFrontFace extends CardFace {
    static type = "Agenda Front";
    static frame = treachery;

    constructor(face) {
        super(face, AgendaFrontFace.type);
        if (!face) {
            face = {};
        }
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.agendaNumber = face.agendaNumber || "1a"
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.doomThreshold = face.doomThreshold || "";
        this.isPer = face.isPer || "";
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <AgendaFrontFaceView
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
            <AgendaFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }
}
