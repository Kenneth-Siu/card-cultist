import getCardFace from "./cardFaces/getCardFace";

export default class Card {
    constructor(idOrCard) {
        if (typeof idOrCard === "number") {
            this.id = idOrCard;
            this.frontFace = null;
            this.backFace = null;
        }
        Object.assign(this, idOrCard);
        this.frontFace = getCardFace(idOrCard.frontFace);
        this.backFace = getCardFace(idOrCard.backFace);
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
