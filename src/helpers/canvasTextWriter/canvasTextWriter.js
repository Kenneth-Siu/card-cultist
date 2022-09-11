import makeLines from "./makeLines";
import splitIntoAtoms from "./splitIntoAtoms";

// TODO some way to detect bottom of rect, for use with campaign guide
// TODO make symbols work with center/right align
// (probably just have to write line out normally, measure, then adjust the starting position to make it centered)
export function writeText(canvasContext, canvasTextConfig) {
    const { text, align, fontSize, fontFamily, x, y } = canvasTextConfig;
    if (align === "center") {
        writeCenteredLine(canvasContext, canvasTextConfig);
        return;
    }
    canvasContext.textAlign = "start";
    const atoms = splitIntoAtoms(text);
    const lines = makeLines(atoms, canvasContext, canvasTextConfig);

    canvasContext.font = `${fontSize}px ${fontFamily}`;
    lines.forEach((line, lineNumber) => {
        let currentX = x;

        line.forEach((atom) => {
            if (typeof atom === "string") {
                canvasContext.font = `${fontSize}px ${fontFamily}`;
                canvasContext.fillText(atom, currentX, y + lineNumber * fontSize);
                currentX += canvasContext.measureText(atom).width;
            } else {
                // TODO Extend to any atom
                canvasContext.font = `${fontSize}px AHCardTextSymbols`;
                canvasContext.fillText(atom.character, currentX, y + lineNumber * fontSize);
                currentX += canvasContext.measureText(atom.character).width;
            }
        });
    });
}

export function writeCenteredLine(canvasContext, { text, x, y, fontSize, fontFamily }) {
    canvasContext.font = `${fontSize}px ${fontFamily}`;
    canvasContext.textAlign = "center";
    canvasContext.fillText(text, x, y);
}
