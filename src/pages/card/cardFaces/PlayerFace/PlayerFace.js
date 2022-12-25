import React from "react";
import CardFace from "../BlankFace/CardFace";
import playerBack from "../../../../../public/templates/backs/playerBack.png";
import PlayerFaceView from "./PlayerFaceView";
import PlayerFaceCanvas from "./PlayerFaceCanvas";

export default class PlayerFace extends CardFace {
    static type = "Player";
    static frame = playerBack;

    constructor(face) {
        super(face, PlayerFace.type);
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <PlayerFaceView
                face={this}
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
            />
        );
    }

    getCanvas(cardId) {
        return <PlayerFaceCanvas key={cardId} />;
    }
}
