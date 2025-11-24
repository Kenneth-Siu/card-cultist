import React from "react";
import CardFace from "../BlankFace/CardFace";
import playerBack from "../../../../../public/templates/backs/playerBackLandscape.png";
import LandscapePlayerFaceCanvas from "./LandscapePlayerFaceCanvas";
import LandscapePlayerFaceView from "./LandscapePlayerFaceView";

export default class LandscapePlayerFace extends CardFace {
    static type = "Player (Landscape)";
    static frame = playerBack;

    constructor(face) {
        super(face, LandscapePlayerFace.type);
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <LandscapePlayerFaceView
                face={this}
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
            />
        );
    }

    getCanvas(cardId) {
        return <LandscapePlayerFaceCanvas key={cardId} />;
    }
}
