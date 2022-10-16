import { TEXTALIGN } from "../../models/CanvasTextConfig";
import { PARAGRAPH_SPACING } from "../../pages/campaignGuide/canvasConstants";
import makeLines from "./makeLines";
import splitIntoAtoms from "./splitIntoAtoms";

// TODO properly support more languages (...maybe. It's a lot of work...)
// TODO allow defining non-rectangular text box
export function writeText(canvasContext, canvasTextConfig) {
    canvasContext.save();
    const { text, align, fontSize, fontFamily, x, y, width, color, lineHeight } = canvasTextConfig;
    canvasContext.textAlign = TEXTALIGN.LEFT;
    const atoms = splitIntoAtoms(text, canvasTextConfig);
    const lines = makeLines(atoms, canvasContext, canvasTextConfig);

    let { italic, bold } = canvasTextConfig;
    let currentColor = color;
    let indent = 0;

    let currentY = y;
    let maxLineWidth = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const lineWidth = getLineWidth();
        maxLineWidth = Math.max(lineWidth, maxLineWidth);
        const alignmentIndent =
            align !== TEXTALIGN.LEFT ? (width - lineWidth) * (align === TEXTALIGN.RIGHT ? 1 : 0.5) : 0;
        let currentX = x + alignmentIndent + (TEXTALIGN.LEFT ? indent : 0);

        line.forEach((atom) => {
            if (typeof atom === "string") {
                writeText(atom);
            } else {
                atom.writeToCanvas({ writeSymbols, setItalic, setBold, startIndent, endIndent, setColor, endColor });
            }
        });

        if (lines.slice(i + 1).every((futureLine) => futureLine.length === 0)) {
            break;
        }

        if (line.length === 0) {
            currentY += fontSize * lineHeight * PARAGRAPH_SPACING;
        } else {
            currentY += fontSize * lineHeight;
        }

        function getLineWidth() {
            const startingItalic = italic;
            const startingBold = bold;
            const startingIndent = indent;
            const lineWidth = line.reduce((currentLineWidth, atom) => {
                if (typeof atom === "string") {
                    return currentLineWidth + getTextWidth(atom);
                } else {
                    return (
                        currentLineWidth +
                        atom.getWidth({
                            getTextWidth,
                            getSymbolWidth,
                            setItalic,
                            setBold,
                            startIndent,
                            endIndent,
                            setColor: () => {},
                            endColor: () => {},
                        })
                    );
                }
            }, 0);
            italic = startingItalic;
            bold = startingBold;
            indent = startingIndent;
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
            canvasContext.fillStyle = currentColor;
            canvasContext.fillText(text, currentX, currentY);
            currentX += canvasContext.measureText(text).width;
        }

        function writeSymbols(text, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth) {
            canvasContext.font = `${fontSize + fontSize * nudgeFactorSize}px AHCardTextSymbols`;
            canvasContext.fillStyle = currentColor;
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
    }

    canvasContext.restore();
    return { y: currentY, w: maxLineWidth };

    function setItalic(value) {
        italic = value;
    }

    function setBold(value) {
        bold = value;
    }

    function setColor(value) {
        if (color !== "transparent") {
            currentColor = value;
        }
    }

    function endColor() {
        currentColor = color;
    }
}
