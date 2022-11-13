import ActBackFace from "./ActBackFace/ActBackFace";
import ActFrontFace from "./ActFrontFace/ActFrontFace";
import AgendaBackFace from "./AgendaBackFace/AgendaBackFace";
import AgendaFrontFace from "./AgendaFrontFace/AgendaFrontFace";
import CardFace from "./BlankFace/CardFace";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import LocationBackFace from "./LocationBackFace/LocationBackFace";
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
    LocationBackFace,
    TreacheryFace,
    CardFace,
    MythosFace,
];

export default listOfCardFaces;
