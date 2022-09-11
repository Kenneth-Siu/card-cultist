import Atom from "./Atom";

export default class Instruction extends Atom {
    constructor() {
        super();
    }

    write({ addToLine }) {
        addToLine(this, 0);
    }
}
