import Instruction from "./Instruction";

export default class StartIndent extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, startIndent }) {
        super.addToLine({ addAtomToLine });
        startIndent();
    }

    writeToCanvas({ startIndent }) {
        startIndent();
    }

    getWidth({ startIndent }) {
        startIndent();
        return 0;
    }
}
