import React from "react";
import BlankFaceView from "../../pages/card/cardFaceViews/BlankFaceView";

export default class CardFace {
    static type = "None";
    static frame = null;

    constructor(face, type, frame) {
        this.type = type || CardFace.type;
        Object.assign(this, face);
    }

    getView(typeSelect, canvas, face, cardSet, campaign, setCampaign) {
        return <BlankFaceView typeSelect={typeSelect} canvas={canvas} />;
    }
}
