import MythosFace from "./MythosFace";
import TreacheryFace from "./TreacheryFace";

export default function getCardFace(cardFace) {
    if (!cardFace) {
        return null;
    }
    let face = {};
    switch (cardFace.type) {
        case "mythos":
            face = new MythosFace();
            break;
        case "treachery":
            face = new TreacheryFace();
            break;
    }
    Object.assign(face, cardFace);
    return face;
}
