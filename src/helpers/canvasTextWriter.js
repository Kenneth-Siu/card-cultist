const symbolMapping = {
    "<guardian>": "a",
    "<gua>": "a",
    "<seeker>": "b",
    "<see>": "b",
    "<mystic>": "c",
    "<mys>": "c",
    "<rogue>": "d",
    "<rog>": "d",
    "<survivor>": "e",
    "<sur>": "e",
    "<willpower>": "f",
    "<wil>": "f",
    "<intellect>": "g",
    "<int>": "g",
    "<combat>": "h",
    "<com>": "h",
    "<agility>": "i",
    "<agi>": "i",
    "<wild>": "j",
};

// TODO some way to detect bottom of rect, for use with campaign guide

/*
Config:
x
y
width
height
fontSize
fontFamily
 */

export function writeText(canvasContext, text, config) {
    canvasContext.textAlign = "start";
    const lines = getLines(canvasContext, text, config);
    canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
    lines.forEach((line, lineNumber) => {
        let currentX = config.x;
        for (let i = 0; i < line.length; i++) {
            if (symbolMapping[line[i]]) {
                canvasContext.font = `${config.fontSize}px AHCardTextSymbols`;
                canvasContext.fillText(symbolMapping[line[i]], currentX, config.y + lineNumber * config.fontSize);
                currentX += canvasContext.measureText(symbolMapping[line[i]]).width;
            } else {
                canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
                canvasContext.fillText(line[i], currentX, config.y + lineNumber * config.fontSize);
                currentX += canvasContext.measureText(line[i]).width;
            }
        }
    });
}

/*
Config:
x
y
fontSize
fontFamily
 */
export function writeCenteredLine(canvasContext, text, config) {
    canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
    canvasContext.textAlign = "center";
    canvasContext.fillText(text, config.x, config.y);
}

// If first word is too long, this breaks too
// TODO get hyphens to work
// TODO symbols when they're part of a larger word
function getLines(context, text, config) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;

    context.font = `${config.fontSize}px ${config.fontFamily}`;
    const spaceWidth = context.measureText(" ").width;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let wordWidth = 0;
        if (symbolMapping[word]) {
            context.font = `${config.fontSize}px AHCardTextSymbols`;
            wordWidth = context.measureText(symbolMapping[word]).width;
        } else {
            context.font = `${config.fontSize}px ${config.fontFamily}`;
            wordWidth = context.measureText(word).width;
        }
        const newWidth = currentWidth + (i ? spaceWidth : 0) + wordWidth;
        if (newWidth < config.width) {
            if (i != 0) {
                if (symbolMapping[word]) {
                    if (symbolMapping[currentLine[currentLine.length - 1]]) {
                        currentLine.push(" ");
                    } else {
                        currentLine[currentLine.length - 1] += " ";
                    }
                    currentLine.push(word);
                } else {
                    if (symbolMapping[currentLine[currentLine.length - 1]]) {
                        currentLine.push(" ");
                    } else {
                        currentLine[currentLine.length - 1] += " ";
                    }
                    currentLine[currentLine.length - 1] += word;
                }
            } else {
                currentLine.push(word);
            }
            currentWidth = newWidth;
        } else {
            lines.push(currentLine);
            currentLine = [word];
            currentWidth = wordWidth;
        }
    }
    lines.push(currentLine);
    return lines;
}
