import AHSymbol from "./atoms/AHSymbol";
import EndBold from "./atoms/instructions/EndBold";
import EndColor from "./atoms/instructions/EndColor";
import EndItalic from "./atoms/instructions/EndItalic";
import EndTrait from "./atoms/instructions/EndTrait";
import StartBold from "./atoms/instructions/StartBold";
import StartColor from "./atoms/instructions/StartColor";
import StartItalic from "./atoms/instructions/StartItalic";
import StartTrait from "./atoms/instructions/StartTrait";

export const bulletAHSymbol = new AHSymbol("w");
export const gBulletAHSymbol = new AHSymbol("x", 0.33, 0, 0.22);

const symbolDictionary = {
    "<guardian>": new AHSymbol("a", 0.2, 0, 0.1, 0.02),
    "<gua>": new AHSymbol("a", 0.2, 0, 0.1, 0.02),
    "<seeker>": new AHSymbol("b", 0.2, -0.2, 0.1),
    "<see>": new AHSymbol("b", 0.2, -0.2, 0.1),
    "<mystic>": new AHSymbol("c", 0.2, 0, 0.1),
    "<mys>": new AHSymbol("c", 0.2, 0, 0.1),
    "<rogue>": new AHSymbol("d", 0.2, -0.1, 0.1),
    "<rog>": new AHSymbol("d", 0.2, -0.1, 0.1),
    "<survivor>": new AHSymbol("e", 0.2, 0, 0.1, 0.02),
    "<sur>": new AHSymbol("e", 0.2, 0, 0.1, 0.02),
    "<willpower>": new AHSymbol("f", 0.1, -0.2, 0.125),
    "<wil>": new AHSymbol("f", 0.1, -0.2, 0.125),
    "<intellect>": new AHSymbol("g", 0.1, -0.1, 0.125),
    "<int>": new AHSymbol("g", 0.1, -0.1, 0.125),
    "<combat>": new AHSymbol("h", 0.1, -0.17, 0.125),
    "<com>": new AHSymbol("h", 0.1, -0.17, 0.125),
    "<agility>": new AHSymbol("i", 0.1, -0.17, 0.125),
    "<agi>": new AHSymbol("i", 0.1, -0.17, 0.125),
    "<wild>": new AHSymbol("j", -0.12, -0.17, 0),
    "<eld>": new AHSymbol("k", 0.1, 0, 0.15),
    "<neu>": new AHSymbol("l", 0.2, -0.05, 0.2),
    "<sku>": new AHSymbol("m", 0.1, -0.15, 0.15),
    "<cul>": new AHSymbol("n", 0.1, -0.1, 0.15),
    "<tab>": new AHSymbol("o", 0.1, -0.1, 0.15),
    "<thi>": new AHSymbol("p", 0.1, -0.1, 0.12),
    "<mon>": new AHSymbol("p", 0.1, -0.1, 0.12),
    "<aut>": new AHSymbol("q", 0.1, -0.08, 0.17),
    "<ten>": new AHSymbol("q", 0.1, -0.08, 0.17),
    "<per>": new AHSymbol("r", 0, 0.05, 0.1, -0.1),
    "<wea>": new AHSymbol("s", 0.1, -0.1, 0.15),
    "<act>": new AHSymbol("t", 0.4, -0.05, 0.25),
    "<rea>": new AHSymbol("u", 0.4, -0.05, 0.25),
    "<fre>": new AHSymbol("v", 1.22, 0, 0.55),
    "<bul>": bulletAHSymbol,
    "<gbul>": gBulletAHSymbol,
    "<cur>": new AHSymbol("y", 0.1, -0.1, 0.1),
    "<ble>": new AHSymbol("z", 0.1, -0.1, 0.15),
    "<fro>": new AHSymbol("A", 0.1, -0.1, 0.15),
    "<seala>": new AHSymbol("B", 0.1, -0.05, 0.15),
    "<sealb>": new AHSymbol("C", 0.1, -0.05, 0.15),
    "<sealc>": new AHSymbol("D", 0.1, -0.05, 0.15),
    "<seald>": new AHSymbol("E", 0.1, -0.05, 0.15),
    "<seale>": new AHSymbol("F", 0.1, -0.05, 0.15),
};

const instructionDictionary = {
    "<i>": StartItalic,
    "</i>": EndItalic,
    "<b>": StartBold,
    "</b>": EndBold,
    "<t>": StartTrait,
    "</t>": EndTrait,
    // Start color requires extra processing
    "</color>": EndColor,
};

const textReplacementDictionary = {
    "<rev>": "<b>Revelation – </b>",
    "<for>": "<b>Forced – </b>",
    "<obj>": "<b>Objective – </b>",
    "<pre>": "<b>Prey – </b>",
    "<spa>": "<b>Spawn – </b>",
    "<hau>": "<b>Haunted – </b>",
};

export default function parseTag(tag, highlightColor) {
    if (highlightColor && tag === "<gbul>") {
        return [new StartColor(highlightColor), gBulletAHSymbol, new EndColor()];
    }
    if (symbolDictionary[tag]) {
        return [symbolDictionary[tag]];
    }
    if (tag.startsWith("<color=")) {
        return [new StartColor(tag.substring(7, tag.length - 1))];
    }
    if (instructionDictionary[tag]) {
        return [new instructionDictionary[tag]()];
    }
    if (textReplacementDictionary[tag]) {
        return [textReplacementDictionary[tag]];
    }
    return [];
}
