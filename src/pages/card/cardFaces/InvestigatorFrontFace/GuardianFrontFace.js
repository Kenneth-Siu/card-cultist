import investigatorFront from "../../../../../public/templates/investigators/guardian.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class GuardianFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Guardian)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, GuardianFrontFace.frame);
    }
}
