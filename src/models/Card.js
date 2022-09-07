import getCardFaceClassInstance from "./cardFaces/getCardFaceClassInstance";

export default class Card {
    constructor(idOrCard) {
        if (typeof idOrCard === "number") {
            this.id = idOrCard;
            this.frontFace = null;
            this.backFace = null;
        }
        Object.assign(this, idOrCard);
        this.frontFace = getCardFaceClassInstance(idOrCard.frontFace);
        this.backFace = getCardFaceClassInstance(idOrCard.backFace);
    }

    getTitle() {
        if (this.frontFace && this.frontFace.title) {
            return this.frontFace.title;
        }
        if (this.backFace && this.backFace.title) {
            return this.backFace.title;
        }
        return "";
    }
}
