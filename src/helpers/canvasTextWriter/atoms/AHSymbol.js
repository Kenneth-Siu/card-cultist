import Atom from "./Atom";

export default class AHSymbol extends Atom {
    constructor(character) {
        super();
        this.character = character;
    }

    addToLine({ makeNewLine, getSymbolWidth, wouldMakeNewLine, addAtomToLine }) {
        const symbolWidth = getSymbolWidth(this.character);
        if (wouldMakeNewLine(symbolWidth)) {
            makeNewLine();
        }
        addAtomToLine(this, symbolWidth);
    }

    writeToCanvas({ writeSymbols }) {
        writeSymbols(this.character);
    }
}
