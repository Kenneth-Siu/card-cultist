export default function makeLines(atoms, context, { width, fontSize, fontFamily }) {
    const lines = [];
    let line = [];
    let lineWidth = 0;
    let italic = false;
    let bold = false;

    atoms.forEach((atom) => {
        atom.addToLine({ makeNewLine, getWidth, getSymbolWidth, wouldMakeNewLine, addAtomToLine, setItalic, setBold });
        if (line.length > 1 && typeof line[line.length - 1] === "string" && typeof line[line.length - 2] === "string") {
            const text = line.pop();
            line[line.length - 1] += text;
        }
    });

    lines.push(line);

    return lines;

    function makeNewLine() {
        lines.push(line);
        line = [];
        lineWidth = 0;
    }

    function getWidth(atom) {
        context.font = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
        return context.measureText(atom).width;
    }

    function getSymbolWidth(atom) {
        context.font = `${fontSize}px AHCardTextSymbols`;
        return context.measureText(atom).width;
    }

    function wouldMakeNewLine(atomWidth) {
        if (lineWidth === 0 || width === 0) {
            return false;
        }
        return lineWidth + atomWidth > width;
    }

    function addAtomToLine(atom, width) {
        line.push(atom);
        lineWidth += width;
    }

    function setItalic(value) {
        italic = value;
    }

    function setBold(value) {
        bold = value;
    }
}
