import NewLine from "./atoms/NewLine";
import Space from "./atoms/Space";
import Word from "./atoms/Word";
import parseTag from "./parseTag";

const shorthands = {
    "Revelation -- ": "<b>Revelation – </b>",
    "Revelation - ": "<b>Revelation – </b>",
    "Forced -- ": "<b>Forced – </b>",
    "Forced - ": "<b>Forced – </b>",
    "Objective -- ": "<b>Objective – </b>",
    "Objective - ": "<b>Objective – </b>",
    "Prey -- ": "<b>Prey – </b>",
    "Prey - ": "<b>Prey – </b>",
    "Spawn -- ": "<b>Spawn – </b>",
    "Spawn - ": "<b>Spawn – </b>",
    "Haunted -- ": "<b>Haunted – </b>",
    "Haunted - ": "<b>Haunted – </b>",
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
    ~~ for card name + subtitle

Words are composed of alphanumerics and punctuation. A hyphen ends the word.

*/

// TODO some instructions remain

const escapeable = /[~<>]/g;
function atomEscape(text) {
    return text.replaceAll(escapeable, (match) => `\\${match}`);
}

export default function splitIntoAtoms(text, cardFace) {
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
                const atom = parseTag(text.substring(0, closeSymbolIndex + 1));
                text = text.substring(closeSymbolIndex + 1);
                if (atom) {
                    if (typeof atom === "string") {
                        text = atom + text;
                    } else {
                        atoms.push(atom);
                    }
                }
                continue;
            }
        }

        if (text.startsWith("~") && cardFace && cardFace.title) {
            if (text.at(1) === "~") {
                text = text.substring(2);
                text =
                    `${atomEscape(cardFace.title)}${
                        cardFace.subtitle ? ` <i>(${atomEscape(cardFace.subtitle)})</i>` : ""
                    }` + text;
                continue;
            }
            text = text.substring(1);
            text = atomEscape(cardFace.title) + text;
            continue;
        }

        const shorthand = getShorthand(text);
        if (shorthand) {
            text = text.substring(shorthand.length);
            text = shorthands[shorthand] + text;
            continue;
        }

        if (text.startsWith("\\")) {
            if (text.at(1).match(escapeable)) {
                text = text.substring(1);
            }
            // Do not use continue to skip to next loop, proceed to text processing.
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

function getShorthand(text) {
    for (const shorthand in shorthands) {
        if (text.startsWith(shorthand)) {
            return shorthand;
        }
    }
    return undefined;
}
