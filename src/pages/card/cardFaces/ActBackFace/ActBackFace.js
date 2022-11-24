import React from "react";
import actBack from "../../../../../public/templates/scenario/actBack.png";
import ActBackFaceView from "./ActBackFaceView";
import ActBackFaceCanvas from "./ActBackFaceCanvas";
import AgendaActBackFace from "../_AgendaActBackFace/_AgendaActBackFace";

export default class ActBackFace extends AgendaActBackFace {
    static type = "Act Back";
    static frame = actBack;

    constructor(face) {
        super(face, ActBackFace.type, ActBackFace.frame);
    }

    getView(listOfCardFaces, cardSet, campaign, setCampaign) {
        return (
            <ActBackFaceView
                listOfCardFaces={listOfCardFaces}
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet) {
        return <ActBackFaceCanvas face={this} cardSet={cardSet} key={cardId} />;
    }

    getEmoji() {
        return "📘";
    }
}
