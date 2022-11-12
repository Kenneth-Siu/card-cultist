import Instruction from "./Instruction";

export default class EndFontSize extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, endFontSize }) {
        super.addToLine({ addAtomToLine });
        endFontSize();
    }

    writeToCanvas({ endFontSize }) {
        endFontSize();
    }

    getWidth({ endFontSize }) {
        endFontSize();
        return 0;
    }
}
