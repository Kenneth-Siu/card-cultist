export default class CardFace {
    constructor(type, frame) {
        this.type = type;
        this.frame = frame;
    }

    getView(face, campaign, setCampaign) {
        throw "getView() not defined";
    }
}
