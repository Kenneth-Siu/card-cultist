import investigatorBack from "../../../../../public/templates/investigators/seekerBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import SeekerBackFaceCanvas from "./SeekerBackFaceCanvas";
import SeekerBackFaceView from "./SeekerBackFaceView";

export default class SeekerBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Seeker)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, SeekerBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <SeekerBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <SeekerBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }
}
