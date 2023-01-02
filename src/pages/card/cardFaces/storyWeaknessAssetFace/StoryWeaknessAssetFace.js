import React from "react";
import CardFace from "../BlankFace/CardFace";
import storyWeaknessAsset from "../../../../../public/templates/assets/assetStoryWeakness.png";
import StoryWeaknessAssetFaceView from "./StoryWeaknessAssetFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import StoryWeaknessAssetFaceCanvas from "./StoryWeaknessAssetFaceCanvas";
import subtitle from "../../../../../public/templates/subtitles/weakness.png";

export default class StoryWeaknessAssetFace extends CardFace {
    static type = "Story Weakness (Asset)";
    static frame = storyWeaknessAsset;
    static subtitle = subtitle;

    constructor(face) {
        super(face, StoryWeaknessAssetFace.type);
        if (!face) {
            face = {};
        }
        this.cost = face.cost || "";
        this.cardType = face.cardType === null ? "Asset" : face.cardType || "";
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.skillIcon1 = face.skillIcon1 || "";
        this.skillIcon2 = face.skillIcon2 || "";
        this.skillIcon3 = face.skillIcon3 || "";
        this.skillIcon4 = face.skillIcon4 || "";
        this.skillIcon5 = face.skillIcon5 || "";
        this.subType = face.subType === null ? "Weakness" : face.subType || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.health = face.health || "";
        this.sanity = face.sanity || "";
        this.slot1 = face.slot1 || "";
        this.slot2 = face.slot2 || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSetId = face.campaignSetId || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <StoryWeaknessAssetFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <StoryWeaknessAssetFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "🧪";
    }

    autofill(other) {
        this.autofillField("title", other);
        this.autofillField("subtitle", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("encounterSetSymbol", other);
        this.autofillIllustration(other);
    }
}
