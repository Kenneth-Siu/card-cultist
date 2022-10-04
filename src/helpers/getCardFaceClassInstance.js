import CardFace from "../pages/card/cardFaces/BlankFace/CardFace";
import listOfCardFaces from "../pages/card/cardFaces/listOfCardFaces";

export default function getCardFaceClassInstance(cardFace) {
    if (!cardFace) {
        return new CardFace(cardFace);
    }
    for (let i = 0; i < listOfCardFaces.length; i++) {
        if (listOfCardFaces[i].type === cardFace.type) {
            return new listOfCardFaces[i](cardFace);
        }
    }
    return new CardFace(cardFace);
}
