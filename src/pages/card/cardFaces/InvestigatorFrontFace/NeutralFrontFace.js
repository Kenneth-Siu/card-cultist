import investigatorFront from "../../../../../public/templates/investigators/neutral.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class NeutralFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Neutral)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, NeutralFrontFace.frame);
    }
}
