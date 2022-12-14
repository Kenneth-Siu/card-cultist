import React from "react";
import CardFace from "../BlankFace/CardFace";
import mythosBack from "../../../../../public/templates/backs/mythosBack.png";
import MythosFaceView from "./MythosFaceView";
import MythosFaceCanvas from "./MythosFaceCanvas";

export default class MythosFace extends CardFace {
    static type = "Mythos";
    static frame = mythosBack;

    constructor(face) {
        super(face, MythosFace.type);
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <MythosFaceView
                face={this}
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
            />
        );
    }

    getCanvas(cardId) {
        return <MythosFaceCanvas key={cardId} />;
    }
}
