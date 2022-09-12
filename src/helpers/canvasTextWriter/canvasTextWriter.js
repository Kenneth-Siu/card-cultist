import makeLines from "./makeLines";
import splitIntoAtoms from "./splitIntoAtoms";

// TODO some way to detect bottom of rect, for use with campaign guide
// TODO make symbols work with center/right align
// (probably just have to write line out normally, measure, then adjust the starting position to make it centered)
export function writeText(canvasContext, canvasTextConfig, cardFace) {
    const { text, align, fontSize, fontFamily, x, y } = canvasTextConfig;
    if (align === "center") {
        writeCenteredLine(canvasContext, canvasTextConfig);
        return;
    }
    canvasContext.textAlign = "start";
    const atoms = splitIntoAtoms(text, cardFace);
    const lines = makeLines(atoms, canvasContext, canvasTextConfig);

    let italic = false;
    let bold = false;

    let currentY = y;

    lines.forEach((line) => {
        let currentX = x;

        line.forEach((atom) => {
            if (typeof atom === "string") {
                canvasContext.font = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px ${fontFamily}`;
                canvasContext.fillText(atom, currentX, currentY);
                currentX += canvasContext.measureText(atom).width;
            } else {
                atom.writeToCanvas({ writeSymbols, setItalic, setBold });
            }
        });

        if (line.length === 0) {
            currentY += fontSize * 0.4;
        } else {
            currentY += fontSize;
        }

        function writeSymbols(text) {
            canvasContext.font = `${fontSize}px AHCardTextSymbols`;
            canvasContext.fillText(text, currentX, currentY);
            currentX += canvasContext.measureText(text).width;
        }
    });

    function setItalic(value) {
        italic = value;
    }

    function setBold(value) {
        bold = value;
    }
}

export function writeCenteredLine(canvasContext, { text, x, y, fontSize, fontFamily }) {
    canvasContext.font = `${fontSize}px ${fontFamily}`;
    canvasContext.textAlign = "center";
    canvasContext.fillText(text, x, y);
}
