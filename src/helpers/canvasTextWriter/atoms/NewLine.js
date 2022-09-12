import Atom from "./Atom";

export default class NewLine extends Atom {
    constructor() {
        super();
    }

    addToLine({ makeNewLine }) {
        makeNewLine();
    }
}
