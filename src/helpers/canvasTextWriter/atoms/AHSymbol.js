import Atom from "./Atom";

export default class AHSymbol extends Atom {
    constructor(character, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth) {
        super();
        this.character = character;
        this.nudgeFactorSize = nudgeFactorSize || 0;
        this.nudgeFactorX = nudgeFactorX || 0;
        this.nudgeFactorY = nudgeFactorY || 0;
        this.nudgeFactorWidth = nudgeFactorWidth || 0;
    }

    addToLine({ makeNewLine, getSymbolWidth, wouldMakeNewLine, addAtomToLine }) {
        const symbolWidth = getSymbolWidth(this.character);
        if (wouldMakeNewLine(symbolWidth)) {
            makeNewLine();
        }
        addAtomToLine(this, symbolWidth);
    }

    writeToCanvas({ writeSymbols }) {
        writeSymbols(this.character, this.nudgeFactorSize, this.nudgeFactorX, this.nudgeFactorY, this.nudgeFactorWidth);
    }

    getWidth({ getSymbolWidth }) {
        return getSymbolWidth(this.character);
    }
}
