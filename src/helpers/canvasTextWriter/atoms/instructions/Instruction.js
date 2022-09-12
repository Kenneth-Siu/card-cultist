import Atom from "../Atom";

export default class Instruction extends Atom {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine }) {
        addAtomToLine(this, 0);
    }
}
