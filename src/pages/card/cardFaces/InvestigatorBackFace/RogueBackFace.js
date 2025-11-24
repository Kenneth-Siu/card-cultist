import investigatorBack from "../../../../../public/templates/investigators/rogueBack.png";
import InvestigatorBackFace from "./_InvestigatorBackFace";
import RogueBackFaceCanvas from "./RogueBackFaceCanvas";
import RogueBackFaceView from "./RogueBackFaceView";

export default class RogueBackFace extends InvestigatorBackFace {
    static type = "Investigator Back (Rogue)";
    static frame = investigatorBack;

    constructor(face, type) {
        super(face, type, RogueBackFace.frame);
    }

    getCanvas(cardId, cardSet, setIllustrationTransform) {
        return (
            <RogueBackFaceCanvas
                face={this}
                cardSet={cardSet}
                setIllustrationTransform={setIllustrationTransform}
                key={cardId}
            />
        );
    }
    
        getView(faceDirection, listOfCardFaces, otherFace, cardSet) {
            return (
                <RogueBackFaceView
                    faceDirection={faceDirection}
                    listOfCardFaces={listOfCardFaces}
                    face={this}
                    otherFace={otherFace}
                    cardSet={cardSet}
                />
            );
        }
}
