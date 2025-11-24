import investigatorBack from "../../../../../public/templates/investigators/guardianBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import GuardianBackFaceCanvas from "./GuardianBackFaceCanvas";
import GuardianBackFaceView from "./GuardianBackFaceView";

export default class GuardianBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Guardian)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, GuardianBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <GuardianBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <GuardianBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }
}
