import investigatorFront from "../../../../../public/templates/investigators/survivor.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class SurvivorFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Survivor)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, SurvivorFrontFace.frame);
    }
}
