import Atom from "./Atom";

export default class Word extends Atom {
    constructor(text) {
        super();
        this.text = text;
    }

    addToLine({ makeNewLine, getWidth, wouldMakeNewLine, addAtomToLine }) {
        const wordWidth = getWidth(this.text);
        if (wouldMakeNewLine(wordWidth)) {
            makeNewLine();
        }
        addAtomToLine(this.text, wordWidth);
    }

    isAWord() {
        return true;
    }

    addLetter(letter) {
        this.text += letter;
    }

    hasEnded() {
        return this.text.length > 0 && this.text[this.text.length - 1] === "-";
    }

    getWidth({ getTextWidth }) {
        return getTextWidth(this.text);
    }
}
