import React from "react";
import CardFace from "../BlankFace/CardFace";
import story from "../../../../../public/templates/scenario/story.png";
import StoryFaceView from "./StoryFaceView";
import StoryFaceCanvas from "./StoryFaceCanvas";

export default class StoryFace extends CardFace {
    static type = "Story";
    static frame = story;

    constructor(face) {
        super(face, StoryFace.type);
        if (!face) {
            face = {};
        }
        this.title = face.title || "";
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.textFontSize = face.textFontSize || 30;
        this.header1 = face.header1 || "";
        this.story1 = face.story1 || "";
        this.text1 = face.text1 || "";
        this.header2 = face.header2 || "";
        this.story2 = face.story2 || "";
        this.text2 = face.text2 || "";
        this.header3 = face.header3 || "";
        this.story3 = face.story3 || "";
        this.text3 = face.text3 || "";
        this.cardType = face.cardType === null ? "Story" : face.cardType || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet, campaign, setCampaign) {
        return (
            <StoryFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet, campaign) {
        return <StoryFaceCanvas face={this} cardSet={cardSet} campaign={campaign} key={cardId} />;
    }

    getEmoji() {
        return "📜";
    }
}
