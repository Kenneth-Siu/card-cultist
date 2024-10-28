import React from "react";
import agendaActFullArtBack from "../../../../../public/templates/scenario/agendaActFullArtBack.png";
import CardFace from "../BlankFace/CardFace";
import AgendaActFullArtBackFaceCanvas from "./AgendaActFullArtBackFaceCanvas";
import AgendaActFullArtBackFaceView from "./AgendaActFullArtBackFaceView";
import ImageTransform from "../../../../models/ImageTransform";

export default class AgendaActFullArtBackFace extends CardFace {
    static type = "Agenda/Act Full Art Back";

    constructor(face) {
        super(face, AgendaActFullArtBackFace.type);
        if (!face) {
            face = {};
        }
        this.frame = agendaActFullArtBack;
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <AgendaActFullArtBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }

    getCanvas(cardId, cardSet) {
        return <AgendaActFullArtBackFaceCanvas face={this} cardSet={cardSet} key={cardId} />;
    }

    getEmoji() {
        return "📘";
    }
}
