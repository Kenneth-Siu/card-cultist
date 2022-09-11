import Atom from "./Atom";

export default class Space extends Atom {
    constructor() {
        super();
    }

    write({ makeNewLine, getWidth, wouldMakeNewLine, addToLine }) {
        const spaceWidth = getWidth(" ");
        if (wouldMakeNewLine(spaceWidth)) {
            makeNewLine();
        } else {
            addToLine(" ", spaceWidth);
        }
    }
}
