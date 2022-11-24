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

    getView(typeSelect) {
        return <PlayerFaceView typeSelect={typeSelect} />;
    }

    getCanvas(cardId) {
        return <PlayerFaceCanvas key={cardId} />;
    }
}
