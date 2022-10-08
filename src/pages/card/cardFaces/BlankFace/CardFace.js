import React from "react";
import BlankFaceCanvas from "./BlankFaceCanvas";
import BlankFaceView from "./BlankFaceView";

export default class CardFace {
    static type = "None";
    static frame = null;

    constructor(face, type) {
        this.type = type || CardFace.type;
        Object.assign(this, face);
    }

    getView(typeSelect) {
        return <BlankFaceView typeSelect={typeSelect} />;
    }

    getCanvas() {
        return <BlankFaceCanvas />;
    }
}
