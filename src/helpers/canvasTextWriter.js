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
// TODO make symbols work with center/right align (probably just have to manually determine gaps left or something)
export function writeText(canvasContext, canvasTextConfig) {
    if (canvasTextConfig.align === "center") {
        writeCenteredLine(canvasContext, canvasTextConfig);
        return;
    }
    canvasContext.textAlign = "start";
    const lines = getLines(canvasContext, canvasTextConfig);
    canvasContext.font = `${canvasTextConfig.fontSize}px ${canvasTextConfig.fontFamily}`;
    lines.forEach((line, lineNumber) => {
        let currentX = canvasTextConfig.x;
        for (let i = 0; i < line.length; i++) {
            if (symbolMapping[line[i]]) {
                canvasContext.font = `${canvasTextConfig.fontSize}px AHCardTextSymbols`;
                canvasContext.fillText(symbolMapping[line[i]], currentX, canvasTextConfig.y + lineNumber * canvasTextConfig.fontSize);
                currentX += canvasContext.measureText(symbolMapping[line[i]]).width;
            } else {
                canvasContext.font = `${canvasTextConfig.fontSize}px ${canvasTextConfig.fontFamily}`;
                canvasContext.fillText(line[i], currentX, canvasTextConfig.y + lineNumber * canvasTextConfig.fontSize);
                currentX += canvasContext.measureText(line[i]).width;
            }
        }
    });
}

export function writeCenteredLine(canvasContext, config) {
    canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
    canvasContext.textAlign = "center";
    canvasContext.fillText(config.text, config.x, config.y);
}

// TODO If first word is too long, this breaks too
// TODO get hyphens to work
// TODO symbols when they're part of a larger word
function getLines(context, config) {
    const words = config.text.split(" ");
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
