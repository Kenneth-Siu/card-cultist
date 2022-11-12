import ActBackFace from "./ActBackFace/ActBackFace";
import ActFrontFace from "./ActFrontFace/ActFrontFace";
import AgendaBackFace from "./AgendaBackFace/AgendaBackFace";
import AgendaFrontFace from "./AgendaFrontFace/AgendaFrontFace";
import CardFace from "./BlankFace/CardFace";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import MythosFace from "./MythosFace/MythosFace";
import TreacheryFace from "./TreacheryFace/TreacheryFace";

const listOfCardFaces = [
    ChaosTokenEffectsFace,
    AgendaFrontFace,
    AgendaBackFace,
    ActFrontFace,
    ActBackFace,
    TreacheryFace,
    CardFace,
    MythosFace,
];

export default listOfCardFaces;
