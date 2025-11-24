import investigatorBack from "../../../../../public/templates/investigators/mysticBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import MysticBackFaceCanvas from "./MysticBackFaceCanvas";
import MysticBackFaceView from "./MysticBackFaceView";

export default class MysticBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Mystic)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, MysticBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <MysticBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }

    getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
        return (
            <MysticBackFaceView
                faceDirection={faceDirection}
                listOfCardFaces={listOfCardFaces}
                face={this}
                otherFace={otherFace}
                cardSet={cardSet}
            />
        );
    }
}
