import Atom from "./Atom";

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

export default class AHSymbol extends Atom {
    constructor(ahSymbol) {
        super();
        this.character = symbolDictionary[ahSymbol] || "";
    }

    write({ makeNewLine, getSymbolWidth, wouldMakeNewLine, addToLine }) {
        const symbolWidth = getSymbolWidth(this.character);
        if (wouldMakeNewLine(symbolWidth)) {
            makeNewLine();
        }
        addToLine(this, symbolWidth);
    }
}
