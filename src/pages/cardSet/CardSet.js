import generateId from "../../helpers/generateId";
import Card from "../card/Card";

export default class CardSet {
    constructor(idOrCardSet) {
        if (typeof idOrCardSet === "number") {
            this.id = idOrCardSet;
            this.title = "";
            this.symbol = null;
            this.cards = [];
        }
        Object.assign(this, idOrCardSet);
        this.cards = this.cards.map((card) => new Card(card));
    }

    addCard(card) {
        const id = generateId(this.cards);
        if (card) {
            this.cards.push(new Card({ ...card, id }));
        } else {
            this.cards.push(new Card(id));
        }
        return id;
    }

    getCard(id) {
        return this.cards.find((card) => card.id === id);
    }

    getTitle() {
        return this.title || "SET_ID#" + this.id;
    }
}
