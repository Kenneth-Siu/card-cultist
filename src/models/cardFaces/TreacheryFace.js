import CardFace from "./CardFace";
import treachery from "../../../public/templates/treacheries/treachery.png";

export default class TreacheryFace extends CardFace {
    constructor() {
        super(treachery);
        this.campaignSymbol = null;
        this.encounterSetSymbol = null;
        this.illustration = null;
        this.title = "";
        this.text = "";
        this.illustrator = "";
        this.copyrightInformation = "";
        this.encounterSetId = null;
        this.encounterSetMaxId = null;
        this.campaignSetId = null;
    }
}
