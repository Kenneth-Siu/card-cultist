import React from "react";
import CardFace from "../BlankFace/CardFace";
import chaosBag from "../../../../../public/templates/scenario/chaosBag.png";
import ChaosTokenEffectsFaceView from "./ChaosTokenEffectsFaceView";
import ChaosTokenEffectsFaceCanvas from "./ChaosTokenEffectsFaceCanvas";
import skullTokenImage from "../../../../../public/overlays/AHLCG-ChaosSkull.png";
import cultistTokenImage from "../../../../../public/overlays/AHLCG-ChaosCultist.png";
import tabletTokenImage from "../../../../../public/overlays/AHLCG-ChaosTablet.png";
import elderThingTokenImage from "../../../../../public/overlays/AHLCG-ChaosElderThing.png";

export default class ChaosTokenEffectsFace extends CardFace {
    static type = "Chaos Token Effects";
    static frame = chaosBag;
    static skullTokenImage = skullTokenImage;
    static cultistTokenImage = cultistTokenImage;
    static tabletTokenImage = tabletTokenImage;
    static elderThingTokenImage = elderThingTokenImage;
    static DIFFICULTY = ["Easy / Standard", "Hard / Expert"];

    constructor(face) {
        super(face, ChaosTokenEffectsFace.type);
        if (!face) {
            face = {};
        }
        this.campaignSymbol = face.campaignSymbol || null;
        this.encounterSetSymbol = face.encounterSetSymbol || null;
        this.title = face.title || "";
        this.difficulty = face.difficulty || ChaosTokenEffectsFace.DIFFICULTY[0];
        this.textFontSize = face.textFontSize || 32;
        this.skullText = face.skullText || "";
        this.cultistText = face.cultistText || "";
        this.tabletText = face.tabletText || "";
        this.elderThingText = face.elderThingText || "";
        this.copyrightInformation = face.copyrightInformation || "";
        this.encounterSetId = face.encounterSetId || "";
        this.encounterSetMaxId = face.encounterSetMaxId || "";
        this.campaignSetId = face.campaignSetId || "";
    }

    getView(typeSelect, cardSet, campaign, setCampaign) {
        return (
            <ChaosTokenEffectsFaceView
                typeSelect={typeSelect}
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setCampaign={setCampaign}
            />
        );
    }

    getCanvas(cardId, cardSet, campaign, setIllustrationTransform) {
        return (
            <ChaosTokenEffectsFaceCanvas
                face={this}
                cardSet={cardSet}
                campaign={campaign}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getEmoji() {
        return "💀";
    }
}
