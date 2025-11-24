import investigatorFront from "../../../../../public/templates/investigators/rogue.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class RogueFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Rogue)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, RogueFrontFace.frame);
    }
}
