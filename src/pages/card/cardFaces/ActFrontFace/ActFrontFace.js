import React from "react";
import actFront from "../../../../../public/templates/scenario/actFront.png";
import ActFrontFaceView from "./ActFrontFaceView";
import ActFrontFaceCanvas from "./ActFrontFaceCanvas";
import AgendaActFrontFace from "../_AgendaActFrontFace/_AgendaActFrontFace";

export default class ActFrontFace extends AgendaActFrontFace {
    static type = "Act Front";
    static frame = actFront;

    constructor(face) {
        super(face, ActFrontFace.type, ActFrontFace.frame);
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <ActFrontFaceView
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
            <ActFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "📘";
    }
}
