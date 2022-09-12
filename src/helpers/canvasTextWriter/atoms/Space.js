import Atom from "./Atom";

export default class Space extends Atom {
    constructor() {
        super();
        this.text = " ";
    }

    addToLine({ makeNewLine, getWidth, wouldMakeNewLine, addAtomToLine }) {
        const spaceWidth = getWidth(" ");
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
