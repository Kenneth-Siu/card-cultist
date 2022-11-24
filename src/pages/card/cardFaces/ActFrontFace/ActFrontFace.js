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

    getView(faceDirection, listOfCardFaces, otherFace, cardSet, campaign, setCampaign) {
        return (
            <ActFrontFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet, campaign, setIllustrationTransform) {
        return (
            <ActFrontFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "📘";
    }
}
