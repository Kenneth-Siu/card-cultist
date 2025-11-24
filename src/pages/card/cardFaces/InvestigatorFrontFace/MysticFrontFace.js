import investigatorFront from "../../../../../public/templates/investigators/mystic.png";
import InvestigatorFrontFace from "./_InvestigatorFrontFace";

export default class MysticFrontFace extends InvestigatorFrontFace {
    static type = "Investigator Front (Mystic)";
    static frame = investigatorFront;

    constructor(face, type) {
        super(face, type, MysticFrontFace.frame);
    }
}
