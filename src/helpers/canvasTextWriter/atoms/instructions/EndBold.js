import Instruction from "./Instruction";

export default class EndBold extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setBold }) {
        super.addToLine({ addAtomToLine });
        setBold(false);
    }

    writeToCanvas({ setBold }) {
        setBold(false);
    }

    getWidth({ setBold }) {
        setBold(false);
        return 0;
    }
}
