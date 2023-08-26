const ttsMaxRows = 7;
const ttsMinRows = 2;
export const ttsMaxColumns = 10;
const ttsMinColumns = 2;

export function getTtsDimensions(cardTotal) {
    const spacesNeeded = cardTotal + 1; // Bottom-right is saved for card back
    if (spacesNeeded > ttsMaxColumns * ttsMaxRows) {
        // TODO Separate into two
    }
    return [
        Math.max(ttsMinColumns, Math.min(cardTotal, ttsMaxColumns)),
        Math.max(ttsMinRows, Math.floor(spacesNeeded / ttsMaxColumns) + 1)
    ];
}