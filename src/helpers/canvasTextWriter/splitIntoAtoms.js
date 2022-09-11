import AHSymbol from "./atoms/AHSymbol";
import NewLine from "./atoms/NewLine";
import Space from "./atoms/Space";
import Word from "./atoms/Word";

const shorthands = {
    "Revelation - ": "",
    "Forced - ": "",
    "Objective - ": "",
    "Prey - ": "",
    "Spawn - ": "",
    "Haunted - ": "",
};

/*

Atoms are 
words, 
spaces, 
newlines, 
AHsymbols, 
instructions 
    start/end bold with **
    start/end italic with _
    ~ for card name
    @ for card name + subtitle

Words are composed of alphanumerics and punctuation. A hyphen ends the word.

*/

// TODO instructions

export default function splitIntoAtoms(text) {
    const atoms = [];

    while (text.length > 0) {
        if (text.startsWith(" ")) {
            atoms.push(new Space());
            text = text.substring(1);
            continue;
        }
        if (text.startsWith("\r\n")) {
            atoms.push(new NewLine());
            text = text.substring(2);
            continue;
        }
        if (text.startsWith("\r") || text.startsWith("\n")) {
            atoms.push(new NewLine());
            text = text.substring(1);
            continue;
        }
        if (text.startsWith("<")) {
            const closeSymbolIndex = text.indexOf(">", 1);
            if (closeSymbolIndex !== -1) {
                atoms.push(new AHSymbol(text.substring(0, closeSymbolIndex + 1)));
                text = text.substring(closeSymbolIndex + 1);
                continue;
            }
        }
        if (atoms.length > 0 && atoms[atoms.length - 1].isAWord() && !atoms[atoms.length - 1].hasEnded()) {
            atoms[atoms.length - 1].addLetter(text.at(0));
        } else {
            atoms.push(new Word(text.at(0)));
        }
        text = text.substring(1);
    }

    return atoms;
}
