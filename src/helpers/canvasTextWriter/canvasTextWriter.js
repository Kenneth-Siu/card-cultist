import { TEXTALIGN } from "../../models/CanvasTextConfig";
import makeLines from "./makeLines";
import splitIntoAtoms from "./splitIntoAtoms";

// TODO properly support more languages (...maybe. It's a lot of work...)
// TODO some way to detect bottom of rect, for use with campaign guide
// TODO allow defining non-rectangular text box
export function writeText(canvasContext, canvasTextConfig, cardFace) {
    const { text, align, fontSize, fontFamily, x, y, width, color } = canvasTextConfig;
    canvasContext.textAlign = TEXTALIGN.LEFT;
    const atoms = splitIntoAtoms(text, cardFace);
    const lines = makeLines(atoms, canvasContext, canvasTextConfig);

    let { italic, bold } = canvasTextConfig;
    let indent = 0;

    let currentY = y;

    lines.forEach((line) => {
        const alignmentIndent =
            align !== TEXTALIGN.LEFT ? (width - getLineWidth()) * (align === TEXTALIGN.RIGHT ? 1 : 0.5) : 0;
        let currentX = x + alignmentIndent + (TEXTALIGN.LEFT ? indent : 0);

        line.forEach((atom) => {
            if (typeof atom === "string") {
                writeText(atom);
            } else {
                atom.writeToCanvas({ writeSymbols, setItalic, setBold, startIndent, endIndent });
            }
        });

        if (line.length === 0) {
            currentY += fontSize * 0.4;
        } else {
            currentY += fontSize;
        }

        function getLineWidth() {
            const startingItalic = italic;
            const startingBold = bold;
            const lineWidth = line.reduce((currentLineWidth, atom) => {
                if (typeof atom === "string") {
                    return currentLineWidth + getTextWidth(atom);
                } else {
                    return currentLineWidth + atom.getWidth({ getTextWidth, getSymbolWidth, setItalic, setBold });
                }
            }, 0);
            italic = startingItalic;
            bold = startingBold;
            return lineWidth;
        }

        function getTextWidth(text) {
            canvasContext.font = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
            return canvasContext.measureText(text).width;
        }

        function getSymbolWidth(text) {
            canvasContext.font = `${fontSize}px AHCardTextSymbols`;
            return canvasContext.measureText(text).width;
        }

        function writeText(text) {
            canvasContext.font = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
            canvasContext.fillStyle = color;
            canvasContext.fillText(text, currentX, currentY);
            currentX += canvasContext.measureText(text).width;
        }

        function writeSymbols(text, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth) {
            canvasContext.font = `${fontSize + fontSize * nudgeFactorSize}px AHCardTextSymbols`;
            canvasContext.fillStyle = color;
            canvasContext.fillText(text, currentX + fontSize * nudgeFactorX, currentY + fontSize * nudgeFactorY);
            currentX +=
                canvasContext.measureText(text).width + 2 * (fontSize * nudgeFactorX) + fontSize * nudgeFactorWidth;
        }

        function startIndent() {
            indent = currentX - x;
        }

        function endIndent() {
            indent = 0;
        }
    });

    function setItalic(value) {
        italic = value;
    }

    function setBold(value) {
        bold = value;
    }
}
