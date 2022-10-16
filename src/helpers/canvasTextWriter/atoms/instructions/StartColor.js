import Instruction from "./Instruction";

export default class StartColor extends Instruction {
    constructor(color) {
        super();
        this.color = color;
    }

    addToLine({ addAtomToLine, setColor }) {
        super.addToLine({ addAtomToLine });
        setColor(this.color);
    }

    writeToCanvas({ setColor }) {
        setColor(this.color);
    }

    getWidth({ setColor }) {
        setColor(this.color);
        return 0;
    }
}
