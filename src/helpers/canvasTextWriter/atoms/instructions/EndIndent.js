import Instruction from "./Instruction";

export default class EndIndent extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, endIndent }) {
        super.addToLine({ addAtomToLine });
        endIndent();
    }

    writeToCanvas({ endIndent }) {
        endIndent();
    }

    getWidth({ endIndent }) {
        endIndent();
        return 0;
    }
}
