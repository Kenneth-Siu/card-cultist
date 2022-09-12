import Instruction from "./Instruction";

export default class StartItalic extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setItalic }) {
        super.addToLine({ addAtomToLine });
        setItalic(true);
    }

    writeToCanvas({ setItalic }) {
        setItalic(true);
    }

    getWidth({ setItalic }) {
        setItalic(true);
        return 0;
    }
}
