import ActBackFace from "./ActBackFace/ActBackFace";
import ActFrontFace from "./ActFrontFace/ActFrontFace";
import AgendaBackFace from "./AgendaBackFace/AgendaBackFace";
import AgendaFrontFace from "./AgendaFrontFace/AgendaFrontFace";
import AssetFace from "./AssetFace/AssetFace";
import CardFace from "./BlankFace/CardFace";
import ChaosTokenEffectsFace from "./ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import EnemyFace from "./EnemyFace/EnemyFace";
import LocationBackFace from "./LocationBackFace/LocationBackFace";
import LocationFrontFace from "./LocationFrontFace/LocationFrontFace";
import MythosFace from "./MythosFace/MythosFace";
import PlayerFace from "./PlayerFace/PlayerFace";
import StoryFace from "./StoryFace/StoryFace";
import StoryWeaknessFace from "./StoryWeaknessFace/StoryWeaknessFace";
import TreacheryFace from "./TreacheryFace/TreacheryFace";

const listOfCardFaces = [
    CardFace,
    ChaosTokenEffectsFace,
    AgendaFrontFace,
    AgendaBackFace,
    ActFrontFace,
    ActBackFace,
    LocationFrontFace,
    LocationBackFace,
    EnemyFace,
    TreacheryFace,
    StoryFace,
    StoryWeaknessFace,
    MythosFace,
    PlayerFace,
    AssetFace,
];

export default listOfCardFaces;
