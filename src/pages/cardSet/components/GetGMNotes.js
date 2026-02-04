import ActFrontFace from "../../card/cardFaces/ActFrontFace/ActFrontFace";
import AgendaFrontFace from "../../card/cardFaces/AgendaFrontFace/AgendaFrontFace";
import AssetFace from "../../card/cardFaces/AssetFace/AssetFace";
import ChaosTokenEffectsFace from "../../card/cardFaces/ChaosTokenEffectsFace/ChaosTokenEffectsFace";
import CyberspaceEnemyFace from "../../card/cardFaces/CyberspaceEnemy/CyberspaceEnemyFace";
import CyberspaceLocationBackFace from "../../card/cardFaces/CyberspaceLocationBackFace/CyberspaceLocationBackFace";
import CyberspaceLocationFrontFace from "../../card/cardFaces/CyberspaceLocationFrontFace/CyberspaceLocationFrontFace";
import EnemyFace from "../../card/cardFaces/EnemyFace/EnemyFace";
import NeutralEventFace from "../../card/cardFaces/EventFace/NeutralEventFace";
import InvestigatorEnemyWeaknessFace from "../../card/cardFaces/InvestigatorEnemyWeaknessFace/InvestigatorEnemyWeaknessFace";
import InvestigatorWeaknessFace from "../../card/cardFaces/InvestigatorWeaknessFace/InvestigatorWeaknessFace";
import LocationBackFace from "../../card/cardFaces/LocationBackFace/LocationBackFace";
import LocationFrontFace from "../../card/cardFaces/LocationFrontFace/LocationFrontFace";
import MeatspaceCyberspaceLocationFrontFace from "../../card/cardFaces/MeatspaceCyberspaceLocationFrontFace/MeatspaceCyberspaceLocationFrontFace";
import StoryFace from "../../card/cardFaces/StoryFace/StoryFace";
import StoryWeaknessAssetFace from "../../card/cardFaces/storyWeaknessAssetFace/StoryWeaknessAssetFace";
import StoryWeaknessEventFace from "../../card/cardFaces/StoryWeaknessEventFace/StoryWeaknessEventFace";
import StoryWeaknessFace from "../../card/cardFaces/StoryWeaknessFace/StoryWeaknessFace";
import TreacheryFace from "../../card/cardFaces/TreacheryFace/TreacheryFace";

export default function getGMNotes(card, cardID) {
    return JSON.stringify(getGMNotesObj(card, cardID));
}

function getGMNotesObj(card, cardID) {
    if (!card.frontFace) {
        return "";
    }
    let notes = {
        "id": "twoa2205" + cardID.toString(),
        "traits": card.frontFace.traits,
        "cost": card.frontFace.cost,
        "cycle": "The Worlds of Android"
    };
    if (card.frontFace.type.startsWith("Investigator Front")) {
        return Object.assign(notes, {
            "type": "Investigator",
            "class": (() => {
                const match = card.frontFace.type.match(/\(([^)]+)\)/);
                return match ? match[1] : "";
            })(),
            "willpowerIcons": parseInt(card.frontFace.willpower, 10),
            "intellectIcons": parseInt(card.frontFace.intellect, 10),
            "combatIcons": parseInt(card.frontFace.combat, 10),
            "agilityIcons": parseInt(card.frontFace.agility, 10)
        });
    }
    switch (card.frontFace.type) {
        case AssetFace.type:
            return Object.assign(notes, {
                "type": "Asset",
                "class": "Neutral",
                "slot": getSlot(card.frontFace) || undefined,
                "willpowerIcons": getIcons(card.frontFace, "willpower") || undefined,
                "intellectIcons": getIcons(card.frontFace, "intellect") || undefined,
                "combatIcons": getIcons(card.frontFace, "combat") || undefined,
                "agilityIcons": getIcons(card.frontFace, "agility") || undefined,
                "wildIcons": getIcons(card.frontFace, "wild") || undefined
            });
        case StoryWeaknessAssetFace.type:
            return Object.assign(notes, {
                "type": "Asset",
                "class": "Neutral",
                "weakness": true,
                "slot": getSlot(card.frontFace) || undefined,
                "willpowerIcons": getIcons(card.frontFace, "willpower") || undefined,
                "intellectIcons": getIcons(card.frontFace, "intellect") || undefined,
                "combatIcons": getIcons(card.frontFace, "combat") || undefined,
                "agilityIcons": getIcons(card.frontFace, "agility") || undefined,
                "wildIcons": getIcons(card.frontFace, "wild") || undefined
            });

        case NeutralEventFace.type:
            return Object.assign(notes, {
                "type": "Event",
                "class": "Neutral"
            });
        case InvestigatorEnemyWeaknessFace.type:
            return Object.assign(notes, {
                "type": "Enemy",
                "class": "Neutral",
                "weakness": true,
            });
        case InvestigatorWeaknessFace.type:
        case StoryWeaknessFace.type:
            return Object.assign(notes, {
                "type": "Treachery",
                "class": "Neutral",
                "weakness": true,
            });
        case StoryWeaknessEventFace.type:
            return Object.assign(notes, {
                "type": "Event",
                "class": "Neutral",
                "weakness": true,
            });
        case ChaosTokenEffectsFace.type:
            return Object.assign(notes, {
                "type": "ScenarioReference",
                "class": "Mythos",
                "tokens": {
                    "front": {
                        "Skull": {
                            "description": card.frontFace.skullText,
                            "modifier": 0
                        },
                        "Cultist": {
                            "description": card.frontFace.cultistText,
                            "modifier": -2
                        },
                        "Tablet": {
                            "description": card.frontFace.tabletText,
                            "modifier": -3
                        },
                        "Elder Thing": {
                            "description": card.frontFace.elderThingText,
                            "modifier": -4
                        }
                    },
                    "back": {
                        "Skull": {
                            "description": card.backFace.skullText,
                            "modifier": 0
                        },
                        "Cultist": {
                            "description": card.backFace.cultistText,
                            "modifier": -2
                        },
                        "Tablet": {
                            "description": card.backFace.tabletText,
                            "modifier": -3
                        },
                        "Elder Thing": {
                            "description": card.backFace.elderThingText,
                            "modifier": -6
                        }
                    }
                }
            });
        case AgendaFrontFace.type:
            return Object.assign(notes, {
                "type": "Agenda",
                "class": "Mythos",
                "doomThreshold": card.frontFace.threshold,
                "victory": getVictoryFromText(card.backFace),
            });
        case ActFrontFace.type:
            return Object.assign(notes, {
                "type": "Act",
                "class": "Mythos",
                "clueThresholdPerInvestigator": card.frontFace.threshold || undefined,
                "victory": getVictoryFromText(card.backFace),
            });
        case TreacheryFace.type:
            return Object.assign(notes, {
                "type": "Treachery",
                "class": "Mythos",
            });
        case EnemyFace.type:
        case CyberspaceEnemyFace.type:
            return Object.assign(notes, {
                "type": "Enemy",
                "class": "Mythos",
                "victory": card.frontFace.victory
                    ? (() => {
                        const match = card.frontFace.victory.match(/Victory\s+(\d+)\./i);
                        return match ? parseInt(match[1], 10) : undefined;
                    })()
                    : undefined,
            });
        case StoryFace.type:
            return Object.assign(notes, {
                "type": "Story",
                "victory": getVictoryFromText(card.frontFace),
            });
        case LocationFrontFace.type:
        case CyberspaceLocationFrontFace.type:
        case MeatspaceCyberspaceLocationFrontFace.type:
            let fields = {
                "type": "Location",
                "locationFront": {
                    "icons": card.frontFace.connectionSymbol,
                    "connections": getConnections(card.frontFace),
                    "victory": card.frontFace.victory
                        ? (() => {
                            const match = card.frontFace.victory.match(/Victory\s+(\d+)\./i);
                            return match ? parseInt(match[1], 10) : undefined;
                        })()
                        : undefined,
                    "uses": [
                        {
                            "count": card.frontFace.cluesIsPer ? undefined : card.frontFace.clues,
                            "countPerInvestigator": card.frontFace.cluesIsPer ? card.frontFace.clues : undefined,
                            "type": "Clue",
                            "token": "clue"
                        }
                    ]
                }
            };
            if (card.backFace.type === LocationFrontFace.type ||
                card.backFace.type === CyberspaceLocationFrontFace.type) {
                fields.locationBack = {
                    "icons": card.backFace.connectionSymbol,
                    "connections": getConnections(card.backFace),
                    "victory": card.backFace.victory
                        ? (() => {
                            const match = card.backFace.victory.match(/Victory\s+(\d+)\./i);
                            return match ? parseInt(match[1], 10) : undefined;
                        })()
                        : undefined,
                    "uses": [
                        {
                            "count": card.backFace.cluesIsPer ? undefined : card.backFace.clues,
                            "countPerInvestigator": card.backFace.cluesIsPer ? card.backFace.clues : undefined,
                            "type": "Clue",
                            "token": "clue"
                        }
                    ]
                }
            }
            if (card.backFace.type === LocationBackFace.type ||
                card.backFace.type === CyberspaceLocationBackFace.type) {
                fields.locationBack = {
                    "icons": card.backFace.connectionSymbol,
                    "connections": getConnections(card.backFace)
                }
            }
            return Object.assign(notes, fields);
    }
    return "";
}

function getVictoryFromText(face) {
    const match1 = face.text1?.match(/Victory\s+(\d+)\./i);
    if (match1) { return parseInt(match1[1], 10); }
    const match2 = face.text2?.match(/Victory\s+(\d+)\./i);
    if (match2) { return parseInt(match2[1], 10); }
    const match3 = face.text3?.match(/Victory\s+(\d+)\./i);
    if (match3) { return parseInt(match3[1], 10); }
    const match = face.text?.match(/Victory\s+(\d+)\./i);
    if (match) { return parseInt(match[1], 10); }
    return undefined;
}

function getConnections(face) {
    let connections = "";
    if (face.connection1) {
        connections += face.connection1;
    }
    if (face.connection2) {
        connections += "|" + face.connection2;
    }
    if (face.connection3) {
        connections += "|" + face.connection3;
    }
    if (face.connection4) {
        connections += "|" + face.connection4;
    }
    if (face.connection5) {
        connections += "|" + face.connection5;
    }
    if (face.connection6) {
        connections += "|" + face.connection6;
    }
    return connections;
}

function getSlot(face) {
    let slot = "";
    switch (face.slot1) {
        case "accessory":
            slot += "Accessory";
            break;
        case "ally":
            slot += "Ally";
            break;
        case "arcane":
            slot += "Arcane";
            break;
        case "body":
            slot += "Body";
            break;
        case "hand":
            slot += "Hand";
            break;
        case "doubleArcane":
            slot += "Arcane x2";
            break;
        case "doubleHand":
            slot += "Hand x2";
            break;
        case "tarot":
            slot += "Tarot";
            break;
    }
    switch (face.slot2) {
        case "accessory":
            slot += "|Accessory";
            break;
        case "ally":
            slot += "|Ally";
            break;
        case "arcane":
            slot += "|Arcane";
            break;
        case "body":
            slot += "|Body";
            break;
        case "hand":
            slot += "|Hand";
            break;
        case "doubleArcane":
            slot += "|Arcane x2";
            break;
        case "doubleHand":
            slot += "|Hand x2";
            break;
        case "tarot":
            slot += "|Tarot";
            break;
    }
    return slot;
}

function getIcons(face, iconType) {
    let icons = 0;
    if (face.skillIcon1 === iconType)
        icons++;
    if (face.skillIcon2 === iconType)
        icons++;
    if (face.skillIcon3 === iconType)
        icons++;
    if (face.skillIcon4 === iconType)
        icons++;
    if (face.skillIcon5 === iconType)
        icons++;
    return icons;
}