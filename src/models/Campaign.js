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
        this.path = campaign.path;
        this.title = campaign.title;
        this.icon = campaign.icon;
        this.campaignGuide = campaign.campaignGuide;
        this.cardSets = campaign.cardSets;
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
