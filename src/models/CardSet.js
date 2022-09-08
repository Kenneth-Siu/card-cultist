import generateId from "../helpers/generateId";
import Card from "./card";

export default class CardSet {
    constructor(idOrCardSet) {
        if (typeof idOrCardSet === "number") {
            this.id = idOrCardSet;
            this.title = "";
            this.symbol = null;
            this.cards = [];
        }
        Object.assign(this, idOrCardSet);
        this.cards = this.cards.map(card => new Card(card));
    }

    addCard() {
        const id = generateId(this.cards);
        const card = new Card(id);
        this.cards.push(card);
        return id;
    }

    getCard(id) {
        return this.cards.find((card) => card.id === id);
    }
}
