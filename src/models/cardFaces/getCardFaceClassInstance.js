import CardFace from "./CardFace";
import cardFaces from "./cardFaces";

export default function getCardFaceClassInstance(cardFace) {
    const face = getFace(cardFace);
    Object.assign(face, cardFace);
    return face;
}

function getFace(cardFace) {
    if (!cardFace) {
        return new CardFace();
    }
    for (let i = 0; i < cardFaces.length; i++) {
        if (cardFaces[i].type === cardFace.type) {
            return new cardFaces[i]();
        }
    }
    return new CardFace();
}
