import Instruction from "./Instruction";

export default class EndRaised extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, endRaised }) {
        super.addToLine({ addAtomToLine });
        endRaised();
    }

    writeToCanvas({ endRaised }) {
        endRaised();
    }

    getWidth({ endRaised }) {
        endRaised();
        return 0;
    }
}
