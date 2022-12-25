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

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <AgendaFrontFaceView
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
            <AgendaFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "📕";
    }
}
