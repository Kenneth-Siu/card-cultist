import React from "react";
import CardFace from "../BlankFace/CardFace";
import agendaBack from "../../../../../public/templates/scenario/agendaBack.png";
import AgendaBackFaceView from "./AgendaBackFaceView";
import AgendaBackFaceCanvas from "./AgendaBackFaceCanvas";

export default class AgendaBackFace extends CardFace {
    static type = "Agenda Back";
    static frame = agendaBack;

    constructor(face) {
        super(face, AgendaBackFace.type);
        if (!face) {
            face = {};
        }
        this.agendaNumber = face.agendaNumber || "1b";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.textFontSize = face.textFontSize || 30;
        this.header1 = face.header1 || "";
        this.story1 = face.story1 || "";
        this.text1 = face.text1 || "";
        this.header2 = face.header2 || "";
        this.story2 = face.story2 || "";
        this.text2 = face.text2 || "";
        this.header3 = face.header3 || "";
        this.story3 = face.story3 || "";
        this.text3 = face.text3 || "";
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <AgendaBackFaceView
                typeSelect={typeSelect}
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
}
