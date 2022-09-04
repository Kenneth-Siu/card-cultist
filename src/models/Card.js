export default class Card {
    constructor(idOrCard) {
        if (typeof idOrCard === "number") {
            this.id = idOrCard;
            this.title = "";
            this.frontFace = null;
            this.backFace = null;
        }
        Object.assign(this, idOrCard);
    }
}
