import React from "react";
import BlankFaceView from "../../pages/card/cardFaceViews/BlankFaceView";

export default class CardFace {
    static type = "None";
    static frame = null;

    constructor(type, frame) {
        this.type = type || CardFace.type;
    }

    getView(face, cardSet, campaign, setCampaign) {
        return <BlankFaceView />;
    }
}
