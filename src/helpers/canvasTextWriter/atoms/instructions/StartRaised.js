import Instruction from "./Instruction";

export default class StartRaised extends Instruction {
    constructor(raisedBy) {
        super();
        this.raisedBy = raisedBy;
    }

    addToLine({ addAtomToLine, setRaised }) {
        super.addToLine({ addAtomToLine });
        setRaised(this.raisedBy);
    }

    writeToCanvas({ setRaised }) {
        setRaised(this.raisedBy);
    }

    getWidth({ setRaised }) {
        setRaised(this.raisedBy);
        return 0;
    }
}
