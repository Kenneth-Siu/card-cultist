import React from "react";
import agendaBack from "../../../../../public/templates/scenario/agendaBack.png";
import AgendaBackFaceView from "./AgendaBackFaceView";
import AgendaBackFaceCanvas from "./AgendaBackFaceCanvas";
import AgendaActBackFace from "../_AgendaActBackFace/_AgendaActBackFace";

export default class AgendaBackFace extends AgendaActBackFace {
    static type = "Agenda Back";
    static frame = agendaBack;

    constructor(face) {
        super(face, AgendaBackFace.type, AgendaBackFace.frame);
    }

    getView(listOfCardFaces, cardSet, campaign, setCampaign) {
        return (
            <AgendaBackFaceView
                listOfCardFaces={listOfCardFaces}
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet) {
        return <AgendaBackFaceCanvas face={this} cardSet={cardSet} key={cardId} />;
    }

    getEmoji() {
        return "📕";
    }
}
