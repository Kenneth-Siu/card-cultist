import Instruction from "./Instruction";

export default class EndColor extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, endColor }) {
        super.addToLine({ addAtomToLine });
        endColor();
    }

    writeToCanvas({ endColor }) {
        endColor();
    }

    getWidth({ endColor }) {
        endColor();
        return 0;
    }
}
