import Instruction from "./Instruction";

export default class StartTrait extends Instruction {
    constructor() {
        super();
    }

    addToLine({ addAtomToLine, setItalic, setBold }) {
        super.addToLine({ addAtomToLine });
        setItalic(true);
        setBold(true);
    }

    writeToCanvas({ setItalic, setBold }) {
        setItalic(true);
        setBold(true);
    }

    getWidth({ setItalic, setBold }) {
        setItalic(true);
        setBold(true);
        return 0;
    }
}
