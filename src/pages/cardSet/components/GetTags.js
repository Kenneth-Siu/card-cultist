import ActFrontFace from "../../card/cardFaces/ActFrontFace/ActFrontFace";
import AgendaFrontFace from "../../card/cardFaces/AgendaFrontFace/AgendaFrontFace";
import AssetFace from "../../card/cardFaces/AssetFace/AssetFace";
import ChaosTokenEffectsFace from "../../card/cardFaces/ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import CyberspaceEnemyFace from "../../card/cardFaces/CyberspaceEnemy/CyberspaceEnemyFace";
import CyberspaceLocationFrontFace from "../../card/cardFaces/CyberspaceLocationFrontFace/CyberspaceLocationFrontFace";
import EnemyFace from "../../card/cardFaces/EnemyFace/EnemyFace";
import NeutralEventFace from "../../card/cardFaces/EventFace/NeutralEventFace";
import InvestigatorEnemyWeaknessFace from "../../card/cardFaces/InvestigatorEnemyWeaknessFace/InvestigatorEnemyWeaknessFace";
import InvestigatorWeaknessFace from "../../card/cardFaces/InvestigatorWeaknessFace/InvestigatorWeaknessFace";
import LocationFrontFace from "../../card/cardFaces/LocationFrontFace/LocationFrontFace";
import MeatspaceCyberspaceLocationFrontFace from "../../card/cardFaces/MeatspaceCyberspaceLocationFrontFace/MeatspaceCyberspaceLocationFrontFace";
import StoryFace from "../../card/cardFaces/StoryFace/StoryFace";
import StoryWeaknessAssetFace from "../../card/cardFaces/storyWeaknessAssetFace/StoryWeaknessAssetFace";
import StoryWeaknessEventFace from "../../card/cardFaces/StoryWeaknessEventFace/StoryWeaknessEventFace";
import StoryWeaknessFace from "../../card/cardFaces/StoryWeaknessFace/StoryWeaknessFace";
import TreacheryFace from "../../card/cardFaces/TreacheryFace/TreacheryFace";

export default function getTags(card) {
    if (!card.frontFace) {
        return [];
    }
    if (card.frontFace.type.startsWith("Investigator Front")) {
        return ["PlayerCard", "Investigator"];
    }
    switch (card.frontFace.type) {
        case AssetFace.type:
        case StoryWeaknessAssetFace.type:
            return ["PlayerCard", "Asset"];
        case NeutralEventFace.type:
        case InvestigatorEnemyWeaknessFace.type:
        case InvestigatorWeaknessFace.type:
        case StoryWeaknessEventFace.type:
        case StoryWeaknessFace.type:
            return ["PlayerCard"];
        case ChaosTokenEffectsFace.type:
        case AgendaFrontFace.type:
        case ActFrontFace.type:
        case TreacheryFace.type:
        case EnemyFace.type:
        case CyberspaceEnemyFace.type:
            return ["ScenarioCard"];
        case LocationFrontFace.type:
        case CyberspaceLocationFrontFace.type:
        case MeatspaceCyberspaceLocationFrontFace.type:
            return ["ScenarioCard", "Location"]
        case StoryFace.type:
            return [];
    }
    return [];
}