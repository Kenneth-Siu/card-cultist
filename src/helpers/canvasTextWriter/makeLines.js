import { TEXTALIGN } from "../../models/CanvasTextConfig";
import { PARAGRAPH_SPACING } from "./config";

export default function makeLines(atoms, context, { x, width, bold, italic, fontSize, fontFamily, align, lineHeight }) {
    const lines = [];
    let line = [];
    let currentX = x(0);
    let dy = 0;
    let indent = null;
    let currentFontSize = fontSize;
    let currentFontFamily = fontFamily;

    atoms.forEach((atom) => {
        atom.addToLine({
            makeNewLine,
            getTextWidth,
            getSymbolWidth,
            wouldMakeNewLine,
            addAtomToLine,
            setItalic,
            setBold,
            startIndent,
            endIndent,
            setFontSize,
            endFontSize,
            setFontFamily,
            endFontFamily,
            setColor: () => {},
            endColor: () => {},
            setRaised: () => {},
            endRaised: () => {},
        });
        if (line.length > 1 && typeof line[line.length - 1] === "string" && typeof line[line.length - 2] === "string") {
            const text = line.pop();
            line[line.length - 1] += text;
        }
    });

    lines.push(line);

    return lines;

    function makeNewLine() {
        lines.push(line);
        if (line.length === 0) {
            dy += currentFontSize * lineHeight * PARAGRAPH_SPACING;
        } else {
            dy += currentFontSize * lineHeight;
        }
        line = [];
        currentX = indent !== null ? indent : x(dy);
    }

    function getTextWidth(atom) {
        context.font = `${italic ? "italic " : ""}${bold ? "bold " : ""}${currentFontSize}px ${currentFontFamily}`;
        return context.measureText(atom).width;
    }

    function getSymbolWidth(atom) {
        context.font = `${currentFontSize}px AHCardTextSymbols`;
        return context.measureText(atom).width;
    }

    function wouldMakeNewLine(atomWidth) {
        if (currentX === x(dy) || (indent !== null && currentX === indent) || width(dy) === 0) {
            return false;
        }
        return currentX + atomWidth > x(dy) + width(dy);
    }

    function addAtomToLine(atom, atomWidth) {
        line.push(atom);
        currentX += atomWidth;
    }

    function setItalic(value) {
        italic = value;
    }

    function setBold(value) {
        bold = value;
    }

    function startIndent() {
        if (align === TEXTALIGN.LEFT) {
            indent = currentX;
        }
    }

    function endIndent() {
        indent = null;
    }

    function setFontSize(value) {
        currentFontSize = value;
    }

    function endFontSize() {
        currentFontSize = fontSize;
    }

    function setFontFamily(value) {
        currentFontFamily = value;
    }

    function endFontFamily() {
        currentFontFamily = fontFamily;
    }
}
