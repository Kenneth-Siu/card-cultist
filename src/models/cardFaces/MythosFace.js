import React from "react";
import CardFace from "./CardFace";
import mythosBack from "../../../public/templates/backs/mythosBack.png";
import MythosFaceView from "../../pages/card/cardFaceViews/MythosFaceView";

export default class MythosFace extends CardFace {
    static type = "Mythos";
    static frame = mythosBack;

    constructor(face) {
        super(face, MythosFace.type);
    }

    getView(typeSelect) {
        return <MythosFaceView typeSelect={typeSelect} />;
    }
}
