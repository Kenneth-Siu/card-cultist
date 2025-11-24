import React from "react";
import CardFace from "../BlankFace/CardFace";
import ImageTransform from "../../../../models/ImageTransform";
import SurvivorBackFaceView from "./SurvivorBackFaceView";

export default class InvestigatorBackFace extends CardFace {
    constructor(face, type, frame) {
        super(face, type);
        if (!face) {
            face = {};
        }
        this.isUnique = face.isUnique || false;
        this.frame = frame;
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
    }

    getEmoji() {
        return "👤";
    }
}
