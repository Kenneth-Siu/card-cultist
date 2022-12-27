import remove from "lodash.remove";
import generateId from "../../helpers/generateId";
import Card from "../card/Card";
import { cardFacesInEncounterOrder } from "../card/cardFaces/listOfCardFaces";

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

    deleteCard(id) {
        remove(this.cards, (card) => card.id === id);
    }

    orderCards() {
        this.cards.sort((a, b) => {
            const aIndex = cardFacesInEncounterOrder.findIndex((t) => t.type === a.frontFace.type);
            const bIndex = cardFacesInEncounterOrder.findIndex((t) => t.type === b.frontFace.type);
            if (aIndex === -1 && bIndex === -1) {
                return 0;
            }
            if (aIndex === -1) {
                return 1;
            }
            if (bIndex === -1) {
                return -1;
            }
            return aIndex - bIndex;
        });
    }
}
