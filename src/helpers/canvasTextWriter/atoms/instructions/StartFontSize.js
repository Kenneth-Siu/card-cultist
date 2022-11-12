import Instruction from "./Instruction";

export default class StartFontSize extends Instruction {
    constructor(size) {
        super();
        this.size = size;
    }

    addToLine({ addAtomToLine, setFontSize }) {
        super.addToLine({ addAtomToLine });
        setFontSize(this.size);
    }

    writeToCanvas({ setFontSize }) {
        setFontSize(this.size);
    }

    getWidth({ setFontSize }) {
        setFontSize(this.size);
        return 0;
    }
}
