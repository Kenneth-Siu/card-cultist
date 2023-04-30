import Instruction from "./Instruction";

export default class StartFontFamily extends Instruction {
    constructor(fontfamily) {
        super();
        this.fontfamily = fontfamily;
    }

    addToLine({ addAtomToLine, setFontFamily }) {
        super.addToLine({ addAtomToLine });
        setFontFamily(this.fontfamily);
    }

    writeToCanvas({ setFontFamily }) {
        setFontFamily(this.fontfamily);
    }

    getWidth({ setFontFamily }) {
        setFontFamily(this.fontfamily);
        return 0;
    }
}
