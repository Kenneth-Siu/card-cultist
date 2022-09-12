import AHSymbol from "./atoms/AHSymbol";
import EndBold from "./atoms/instructions/EndBold";
import EndItalic from "./atoms/instructions/EndItalic";
import EndTrait from "./atoms/instructions/EndTrait";
import StartBold from "./atoms/instructions/StartBold";
import StartItalic from "./atoms/instructions/StartItalic";
import StartTrait from "./atoms/instructions/StartTrait";

const symbolDictionary = {
    "<guardian>": "a",
    "<gua>": "a",
    "<seeker>": "b",
    "<see>": "b",
    "<mystic>": "c",
    "<mys>": "c",
    "<rogue>": "d",
    "<rog>": "d",
    "<survivor>": "e",
    "<sur>": "e",
    "<willpower>": "f",
    "<wil>": "f",
    "<intellect>": "g",
    "<int>": "g",
    "<combat>": "h",
    "<com>": "h",
    "<agility>": "i",
    "<agi>": "i",
    "<wild>": "j",
    "<eld>": "k",
    "<neu>": "l",
    "<sku>": "m",
    "<cul>": "n",
    "<tab>": "o",
    "<thi>": "p",
    "<mon>": "p",
    "<aut>": "q",
    "<ten>": "q",
    "<per>": "r",
    "<wea>": "s",
    "<act>": "t",
    "<rea>": "u",
    "<fre>": "v",
    "<bul>": "w",
    "<gbul>": "x",
    "<cur>": "y",
    "<ble>": "z",
    "<fro>": "A",
    "<seala>": "B",
    "<sealb>": "C",
    "<sealc>": "D",
    "<seald>": "E",
    "<seale>": "F",
};

const instructionDictionary = {
    "<i>": StartItalic,
    "</i>": EndItalic,
    "<b>": StartBold,
    "</b>": EndBold,
    "<t>": StartTrait,
    "</t>": EndTrait,
};

const textReplacementDictionary = {
    "<rev>": "<b>Revelation – </b>",
    "<for>": "<b>Forced – </b>",
    "<obj>": "<b>Objective – </b>",
    "<pre>": "<b>Prey – </b>",
    "<spa>": "<b>Spawn – </b>",
    "<hau>": "<b>Haunted – </b>",
};

export default function parseTag(tag) {
    if (symbolDictionary[tag]) {
        return new AHSymbol(symbolDictionary[tag]);
    }
    if (instructionDictionary[tag]) {
        return new instructionDictionary[tag]();
    }
    if (textReplacementDictionary[tag]) {
        return textReplacementDictionary[tag];
    }
    return undefined;
}
