import generateId from "../helpers/generateId";
import CardSet from "./CardSet";

export default class Campaign {
    constructor(campaign) {
        if (!campaign) {
            this.path = "";
            this.title = "";
            this.icon = null;
            this.campaignGuide = null;
            this.cardSets = [];
            return;
        }
        Object.assign(this, campaign);
        this.cardSets = campaign.cardSets.map(cardSet => new CardSet(cardSet));
    }

    clone() {
        return new Campaign(this);
    }

    addCardSet() {
        const id = generateId(this.cardSets);
        const cardSet = new CardSet(id);
        this.cardSets.push(cardSet);
        return id;
    }

    getCardSet(id) {
        return this.cardSets.find((cardSet) => cardSet.id === id);
    }
}
