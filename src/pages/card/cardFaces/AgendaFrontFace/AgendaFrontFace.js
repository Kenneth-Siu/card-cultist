import React from "react";
import treachery from "../../../../../public/templates/scenario/agendaFront.png";
import AgendaFrontFaceView from "./AgendaFrontFaceView";
import AgendaFrontFaceCanvas from "./AgendaFrontFaceCanvas";
import AgendaActFrontFace from "../_AgendaActFrontFace/_AgendaActFrontFace";

export default class AgendaFrontFace extends AgendaActFrontFace {
    static type = "Agenda Front";
    static frame = treachery;

    constructor(face) {
        super(face, AgendaFrontFace.type, AgendaFrontFace.frame);
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

    getEmoji() {
        return "📕";
    }
}
