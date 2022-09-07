import React from "react";
import BlankFaceView from "../../pages/card/cardFaceViews/BlankFaceView";

export default class CardFace {
    static type = "None";

    constructor(type, frame) {
        this.type = type || CardFace.type;
        this.frame = frame;
    }

    getView(face, campaign, setCampaign) {
        return <BlankFaceView />;
    }
}
