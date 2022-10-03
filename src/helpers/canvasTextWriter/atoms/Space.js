import Atom from "./Atom";

export default class Space extends Atom {
    constructor() {
        super();
        this.text = " ";
    }

    addToLine({ makeNewLine, getTextWidth, wouldMakeNewLine, addAtomToLine }) {
        const spaceWidth = getTextWidth(" ");
        if (wouldMakeNewLine(spaceWidth)) {
            makeNewLine();
        } else {
            addAtomToLine(" ", spaceWidth);
        }
    }

    getWidth({ getTextWidth }) {
        return getTextWidth(" ");
    }
}
