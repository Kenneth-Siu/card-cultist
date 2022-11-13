import ActBackFace from "./ActBackFace/ActBackFace";
import ActFrontFace from "./ActFrontFace/ActFrontFace";
import AgendaBackFace from "./AgendaBackFace/AgendaBackFace";
import AgendaFrontFace from "./AgendaFrontFace/AgendaFrontFace";
import CardFace from "./BlankFace/CardFace";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import LocationFrontFace from "./LocationFrontFace/LocationFrontFace";
import MythosFace from "./MythosFace/MythosFace";
import TreacheryFace from "./TreacheryFace/TreacheryFace";

const listOfCardFaces = [
    ChaosTokenEffectsFace,
    AgendaFrontFace,
    AgendaBackFace,
    ActFrontFace,
    ActBackFace,
    LocationFrontFace,
    TreacheryFace,
    CardFace,
    MythosFace,
];

export default listOfCardFaces;
