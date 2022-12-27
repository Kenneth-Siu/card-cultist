import getCardFaceClassInstance from "../../helpers/getCardFaceClassInstance";

export default class Card {
    constructor(idOrCard) {
        if (typeof idOrCard === "number") {
            this.id = idOrCard;
            this.frontFace = null;
            this.backFace = null;
            this.numOfCopies = 1;
        }
        Object.assign(this, idOrCard);
        this.frontFace = getCardFaceClassInstance(idOrCard.frontFace);
        this.backFace = getCardFaceClassInstance(idOrCard.backFace);
        this.numOfCopies = idOrCard.numOfCopies || 1;
    }

    getTitle() {
        if (this.frontFace && this.frontFace.title) {
            return this.frontFace.title;
        }
        if (this.backFace && this.backFace.title) {
            return this.backFace.title;
        }
        return "CARD_ID#" + this.id;
    }

    getEmoji() {
        return this.frontFace.getEmoji() || this.backFace.getEmoji() || "";
    }
}
