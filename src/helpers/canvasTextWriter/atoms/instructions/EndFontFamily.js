import Instruction from "./Instruction";

export default class EndFontFamily extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, endFontFamily }) {
        super.addToLine({ addAtomToLine });
        endFontFamily();
    }

    writeToCanvas({ endFontFamily }) {
        endFontFamily();
    }

    getWidth({ endFontFamily }) {
        endFontFamily();
        return 0;
    }
}
