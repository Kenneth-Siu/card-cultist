import { CARD_PORTRAIT_WIDTH, CARD_PORTRAIT_HEIGHT } from "../../pages/card/cardConstants";

/**
 * Rotates a landscape canvas to portrait orientation.
 * @param {HTMLCanvasElement} landscapeCanvas - Canvas with 1050x750 dimensions
 * @returns {HTMLCanvasElement} - Rotated canvas with 750x1050 dimensions
 */
export default function rotateLandscapeToPortrait(landscapeCanvas) {
    const rotatedCanvas = document.createElement("canvas");
    rotatedCanvas.width = CARD_PORTRAIT_WIDTH;   // 750
    rotatedCanvas.height = CARD_PORTRAIT_HEIGHT; // 1050

    const ctx = rotatedCanvas.getContext("2d");
    ctx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(
        landscapeCanvas,
        -landscapeCanvas.width / 2,
        -landscapeCanvas.height / 2
    );

    return rotatedCanvas;
}
