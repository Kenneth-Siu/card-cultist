import generateId from "../helpers/generateId";
import Card from "./card";

export default class CardSet {
    constructor(id) {
        this.id = id;
        this.title = "";
        this.symbol = null;
        this.cards = [];
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
