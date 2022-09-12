import Instruction from "./Instruction";

export default class StartBold extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setBold }) {
        super.addToLine({ addAtomToLine });
        setBold(true);
    }

    writeToCanvas({ setBold }) {
        setBold(true);
    }
}
