import React from "react";
import CardFace from "../BlankFace/CardFace";
import enemy from "../../../../../public/templates/enemies/enemy.png";
import enemySubtitle from "../../../../../public/templates/enemies/enemySubtitle.png";
import EnemyFaceView from "./EnemyFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import EnemyFaceCanvas from "./EnemyFaceCanvas";
import damage from "../../../../../public/overlays/AHLCG-Damage.png";
import horror from "../../../../../public/overlays/AHLCG-Horror.png";

export default class EnemyFace extends CardFace {
    static type = "Enemy";
    static frame = enemy;
    static frameSubtitle = enemySubtitle;
    static damageImage = damage;
    static horrorImage = horror;

    constructor(face) {
        super(face, EnemyFace.type);
        if (!face) {
            face = {};
        }
        this.isUnique = face.isUnique || false;
        this.title = face.title || "";
        this.subtitle = face.subtitle || "";
        this.fight = face.fight || "";
        this.health = face.health || "";
        this.healthIsPer = face.healthIsPer || "";
        this.evade = face.evade || "";
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.victory = face.victory || "";
        this.damage = face.damage || 0;
        this.horror = face.horror || 0;
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.cardType = face.cardType === null ? "Enemy" : face.cardType || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet, campaign, setCampaign) {
        return (
            <EnemyFaceView
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

    getCanvas(cardId, cardSet, campaign, setIllustrationTransform) {
        return (
            <EnemyFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "👹";
    }

    autofill(other) {
        this.autofillField("isUnique", other);
        this.autofillField("title", other);
        this.autofillField("subtitle", other);
        this.autofillField("fight", other);
        this.autofillField("health", other);
        this.autofillField("healthIsPer", other);
        this.autofillField("evade", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("victory", other);
        this.autofillField("damage", other);
        this.autofillField("horror", other);
        this.autofillField("encounterSetSymbol", other);
        this.autofillIllustration(other);
    }
}
