import Instruction from "./Instruction";

export default class EndTrait extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setItalic, setBold }) {
        super.addToLine({ addAtomToLine });
        setItalic(false);
        setBold(false);
    }

    writeToCanvas({ setItalic, setBold }) {
        setItalic(false);
        setBold(false);
    }

    getWidth({ setItalic, setBold }) {
        setItalic(false);
        setBold(false);
        return 0;
    }
}
