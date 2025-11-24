import investigatorBack from "../../../../../public/templates/investigators/survivorBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import SurvivorBackFaceCanvas from "./SurvivorBackFaceCanvas";
import SurvivorBackFaceView from "./SurvivorBackFaceView";

export default class SurvivorBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Survivor)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, SurvivorBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <SurvivorBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <SurvivorBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }
}
