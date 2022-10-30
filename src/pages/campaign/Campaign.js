import remove from "lodash.remove";
import generateId from "../../helpers/generateId";
import CampaignGuide from "../campaignGuide/CampaignGuide";
import CardSet from "../cardSet/CardSet";

export default class Campaign {
    constructor(campaign) {
        Object.assign(this, campaign);
        if (!campaign) {
            campaign = {};
            return;
        }
        this.path = campaign.path || "";
        this.title = campaign.title || "";
        this.symbol = campaign.symbol || null;
        this.campaignGuide = new CampaignGuide(this.campaignGuide);
        this.cardSets = Array.isArray(campaign.cardSets)
            ? campaign.cardSets.map((cardSet) => new CardSet(cardSet))
            : [];
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

    deleteCardSet(id) {
        remove(this.cardSets, (cardSet) => cardSet.id === id);
    }
}
