import Instruction from "./Instruction";

export default class EndItalic extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setItalic }) {
        super.addToLine({ addAtomToLine });
        setItalic(false);
    }

    writeToCanvas({ setItalic }) {
        setItalic(false);
    }

    getWidth({ setItalic }) {
        setItalic(false);
        return 0;
    }
}
