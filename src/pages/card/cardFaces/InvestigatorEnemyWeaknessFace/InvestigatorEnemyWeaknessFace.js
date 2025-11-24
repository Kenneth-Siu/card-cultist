import React from "react";
import CardFace from "../BlankFace/CardFace";
import enemy from "../../../../../public/templates/enemies/enemyWeakness.png";
import InvestigatorEnemyWeaknessFaceView from "./InvestigatorEnemyWeaknessFaceView";
import ImageTransform from "../../../../models/ImageTransform";
import InvestigatorEnemyWeaknessFaceCanvas from "./InvestigatorEnemyWeaknessFaceCanvas";
import damage from "../../../../../public/overlays/AHLCG-Damage.png";
import horror from "../../../../../public/overlays/AHLCG-Horror.png";

export default class InvestigatorEnemyWeaknessFace extends CardFace {
    static type = "Investigator Weakness (Enemy)";
    static frame = enemy;
    static damageImage = damage;
    static horrorImage = horror;

    constructor(face, type) {
        super(face, type);
        if (!face) {
            face = {};
        }
        this.isUnique = face.isUnique || false;
        this.title = face.title || "";
        this.subtitle = face.subtitle === null ? "WEAKNESS" : face.subtitle || "";
        this.fight = face.fight || "";
        this.fightIsPer = face.fightIsPer || false;
        this.health = face.health || "";
        this.healthIsPer = face.healthIsPer || false;
        this.evade = face.evade || "";
        this.evadeIsPer = face.evadeIsPer || false;
        this.traits = face.traits || "";
        this.text = face.text || "";
        this.textFontSize = face.textFontSize || 34;
        this.flavor = face.flavor || "";
        this.flavorNudgeDown = face.flavorNudgeDown || 0;
        this.victory = face.victory || "";
        this.damage = face.damage || 0;
        this.horror = face.horror || 0;
        this.cardType = face.cardType === null ? "Enemy" : face.cardType || "";
        this.illustration = face.illustration || null;
        this.illustrationTransform = new ImageTransform(face.illustrationTransform);
        this.illustrator = face.illustrator || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.campaignSymbol = face.campaignSymbol || null;
        this.campaignSetId = face.campaignSetId || "";
        this.frame = enemy;
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <InvestigatorEnemyWeaknessFaceView
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
            <InvestigatorEnemyWeaknessFaceCanvas
                face={this}
                cardSet={cardSet}
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
        this.autofillField("fight", other);
        this.autofillField("fightIsPer", other);
        this.autofillField("health", other);
        this.autofillField("healthIsPer", other);
        this.autofillField("evade", other);
        this.autofillField("evadeIsPer", other);
        this.autofillField("traits", other);
        this.autofillField("text", other);
        this.autofillField("victory", other);
        this.autofillField("damage", other);
        this.autofillField("horror", other);
        this.autofillIllustration(other);
    }
}
