import CardFace from "./CardFace";
import cardFaces from "./cardFaces";

export default function getCardFaceClassInstance(cardFace) {
    if (!cardFace) {
        return new CardFace(cardFace);
    }
    for (let i = 0; i < cardFaces.length; i++) {
        if (cardFaces[i].type === cardFace.type) {
            return new cardFaces[i](cardFace);
        }
    }
    return new CardFace(cardFace);
}
