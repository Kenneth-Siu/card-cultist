import investigatorBack from "../../../../../public/templates/investigators/neutralBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import NeutralBackFaceCanvas from "./NeutralBackFaceCanvas";
import NeutralBackFaceView from "./NeutralBackFaceView";

export default class NeutralBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Neutral)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, NeutralBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <NeutralBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <NeutralBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }
}
