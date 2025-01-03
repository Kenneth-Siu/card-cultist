import { TEXTALIGN, TEXTDIRECTION, VERTICAL_TEXTALIGN } from "../../models/CanvasTextConfig";
import { PARAGRAPH_SPACING } from "./config";
import makeLines from "./makeLines";
import splitIntoAtoms from "./splitIntoAtoms";

export class CanvasTextWriter {
    constructor(canvasContext, canvasTextConfig) {
        this.canvasContext = canvasContext;
        this.text = canvasTextConfig.text;
        this.align = canvasTextConfig.align;
        this.verticalAlign = canvasTextConfig.verticalAlign;
        this.configFontSize = canvasTextConfig.fontSize;
        this.configFontFamily = canvasTextConfig.fontFamily;
        this.boxX = canvasTextConfig.x;
        this.boxY = canvasTextConfig.y;
        this.boxW = canvasTextConfig.width;
        this.boxH = canvasTextConfig.height;
        this.configColor = canvasTextConfig.color;
        this.lineHeight = canvasTextConfig.lineHeight;
        this.italic = canvasTextConfig.italic;
        this.bold = canvasTextConfig.bold;
        this.strokeStyle = canvasTextConfig.strokeStyle;
        this.strokeWidth = canvasTextConfig.strokeWidth;
        this.indent = null;
        this.fontSize = this.configFontSize;
        this.fontFamily = this.configFontFamily
        this.color = this.configColor;
        this.x = this.boxX(0);
        this.y = this.boxY;
        this.textDirection = canvasTextConfig.textDirection;
        this.raisedBy = 0;

        const atoms = splitIntoAtoms(this.text, canvasTextConfig);
        this.lines = makeLines(atoms, this.canvasContext, canvasTextConfig);
    }

    write() {
        this.canvasContext.save();
        this.canvasContext.textBaseline = "top";
        if (this.textDirection === TEXTDIRECTION.UP) {
            this.canvasContext.rotate(-Math.PI / 2);
        }
        if (this.verticalAlign === VERTICAL_TEXTALIGN.BOTTOM) {
            this.y = this.y + this.boxH - this.lines.length * this.fontSize * this.lineHeight;
        }
        this.canvasContext.textAlign = TEXTALIGN.LEFT;
        let maxLineWidth = 0;

        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            const lineWidth = this.getLineWidth(line);
            maxLineWidth = Math.max(lineWidth, maxLineWidth);
            this.alignLine(lineWidth);
            line.forEach((atom) => {
                this.writeAtom(atom);
            });
            if (this.allFutureLinesEmpty(i)) {
                break;
            }
            this.carryOutLineFeed(line);
        }

        this.y += this.fontSize;
        this.canvasContext.restore();
        return { y: this.y, w: maxLineWidth };
    }

    getLineWidth(line) {
        const startingItalic = this.italic;
        const startingBold = this.bold;
        const startingIndent = this.indent;
        const startingFontSize = this.fontSize;
        const startingFontFamily = this.fontFamily;
        const startingRaisedBy = this.raisedBy;
        const lineWidth = line.reduce((currentLineWidth, atom) => {
            if (typeof atom === "string") {
                return currentLineWidth + this.getTextWidth(atom);
            } else {
                return (
                    currentLineWidth +
                    atom.getWidth({
                        getTextWidth: (text) => this.getTextWidth(text),
                        getSymbolWidth: (text) => this.getSymbolWidth(text),
                        setItalic: (value) => this.setItalic(value),
                        setBold: (value) => this.setBold(value),
                        startIndent: () => this.startIndent(),
                        endIndent: () => this.endIndent(),
                        setFontSize: (value) => this.setFontSize(value),
                        endFontSize: () => this.endFontSize(),
                        setColor: (value) => this.setColor(value),
                        endColor: () => this.endColor(),
                        setFontFamily: (value) => this.setFontFamily(value),
                        endFontFamily: () => this.endFontFamily(),
                        setRaised: (value) => this.setRaised(value),
                        endRaised: () => this.endRaised(),
                    })
                );
            }
        }, 0);
        this.italic = startingItalic;
        this.bold = startingBold;
        this.indent = startingIndent;
        this.fontSize = startingFontSize;
        this.fontFamily = startingFontFamily;
        this.raisedBy = startingRaisedBy;
        return lineWidth;
    }

    alignLine(lineWidth) {
        const alignmentIndent =
            this.align !== TEXTALIGN.LEFT
                ? (this.boxW(this.y - this.boxY) - lineWidth) * (this.align === TEXTALIGN.RIGHT ? 1 : 0.5)
                : 0;
        this.x =
            this.align === TEXTALIGN.LEFT && this.indent !== null
                ? this.indent
                : this.boxX(this.y - this.boxY) + alignmentIndent;
    }

    writeAtom(atom) {
        if (typeof atom === "string") {
            this.writeText(atom);
        } else {
            atom.writeToCanvas({
                writeSymbols: (text, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth) =>
                    this.writeSymbols(text, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth),
                setItalic: (value) => this.setItalic(value),
                setBold: (value) => this.setBold(value),
                startIndent: () => this.startIndent(),
                endIndent: () => this.endIndent(),
                setFontSize: (value) => this.setFontSize(value),
                endFontSize: () => this.endFontSize(),
                setColor: (value) => this.setColor(value),
                endColor: () => this.endColor(),
                setFontFamily: (value) => this.setFontFamily(value),
                endFontFamily: () => this.endFontFamily(),
                setRaised: (value) => this.setRaised(value),
                endRaised: () => this.endRaised(),
            });
        }
    }

    getTextWidth(text) {
        this.canvasContext.font = `${this.italic ? "italic " : ""}${this.bold ? "bold " : ""}${this.fontSize}px ${
            this.fontFamily
        }`;
        return this.canvasContext.measureText(text).width;
    }

    getSymbolWidth(text) {
        this.canvasContext.font = `${this.fontSize}px AHCardTextSymbols`;
        return this.canvasContext.measureText(text).width;
    }

    startIndent() {
        this.indent = this.x;
    }

    endIndent() {
        this.indent = null;
    }

    setFontSize(value) {
        this.fontSize = Math.max(0.1, value);
    }

    endFontSize() {
        this.fontSize = this.configFontSize;
    }

    setFontFamily(value) {
        this.fontFamily = value;
    }

    endFontFamily() {
        this.fontFamily = this.configFontFamily;
    }

    setItalic(value) {
        this.italic = value;
    }

    setBold(value) {
        this.bold = value;
    }

    setColor(value) {
        if (this.color !== "transparent") {
            this.color = value;
        }
    }

    endColor() {
        this.color = this.configColor;
    }

    setRaised(value) {
        this.raisedBy = value;
    }

    endRaised() {
        this.raisedBy = 0;
    }

    writeText(text) {
        this.canvasContext.font = `${this.italic ? "italic " : ""}${this.bold ? "bold " : ""}${this.fontSize}px ${
            this.fontFamily
        }`;
        if (this.strokeWidth > 0) {
            this.canvasContext.strokeStyle = this.strokeStyle;
            this.canvasContext.lineWidth = this.strokeWidth;
            this.canvasContext.strokeText(text, this.x, this.y - this.raisedBy);
        }
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillText(text, this.x, this.y - this.raisedBy);
        this.x += this.canvasContext.measureText(text).width;
    }

    writeSymbols(text, nudgeFactorSize, nudgeFactorX, nudgeFactorY, nudgeFactorWidth) {
        this.canvasContext.font = `${this.fontSize + this.fontSize * nudgeFactorSize}px AHCardTextSymbols`;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillText(
            text,
            this.x + this.fontSize * nudgeFactorX,
            this.y - this.raisedBy + this.fontSize * nudgeFactorY
        );
        this.x +=
            this.canvasContext.measureText(text).width +
            2 * (this.fontSize * nudgeFactorX) +
            this.fontSize * nudgeFactorWidth;
    }

    allFutureLinesEmpty(currentLineIndex) {
        return this.lines.slice(currentLineIndex + 1).every((futureLine) => futureLine.length === 0);
    }

    carryOutLineFeed(line) {
        if (line.length === 0) {
            this.y += this.fontSize * this.lineHeight * PARAGRAPH_SPACING;
        } else {
            this.y += this.fontSize * this.lineHeight;
        }
    }
}
