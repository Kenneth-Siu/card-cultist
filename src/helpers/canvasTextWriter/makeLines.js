export default function makeLines(atoms, context, { width, fontSize, fontFamily }) {
    const lines = [];
    let line = [];
    let lineWidth = 0;

    atoms.forEach((atom) => atom.write({ makeNewLine, getWidth, getSymbolWidth, wouldMakeNewLine, addToLine }));

    lines.push(line);

    // TODO for each line, merge contiguous strings together

    return lines;

    function makeNewLine() {
        lines.push(line);
        line = [];
        lineWidth = 0;
    }

    function getWidth(atom) {
        context.font = `${fontSize}px ${fontFamily}`;
        return context.measureText(atom).width;
    }

    function getSymbolWidth(atom) {
        context.font = `${fontSize}px AHCardTextSymbols`;
        return context.measureText(atom).width;
    }

    function wouldMakeNewLine(atomWidth) {
        if (lineWidth === 0) {
            return false;
        }
        return lineWidth + atomWidth > width;
    }

    function addToLine(atom, width) {
        line.push(atom);
        lineWidth += width;
    }
}
