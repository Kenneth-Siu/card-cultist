import investigatorFront from "../../../../../public/templates/investigators/seeker.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class SeekerFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Seeker)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, SeekerFrontFace.frame);
    }
}
