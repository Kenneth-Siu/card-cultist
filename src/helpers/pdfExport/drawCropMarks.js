import {
    CROP_MARK_LENGTH,
    CROP_MARK_OFFSET,
    CROP_MARK_COLOR,
    CROP_MARK_LINE_WIDTH,
    BLEED_PX
} from "./pdfExportConfig";
import { CARD_PORTRAIT_WIDTH, CARD_PORTRAIT_HEIGHT } from "../../pages/card/cardConstants";

/**
 * Draws crop marks at the four corners of a card to indicate where to cut.
 * Marks are drawn in the bleed area, pointing to the actual card boundary.
 *
 * @param {CanvasRenderingContext2D} ctx - The page canvas context
 * @param {number} x - X position of the card (including bleed) on the page
 * @param {number} y - Y position of the card (including bleed) on the page
 */
export default function drawCropMarks(ctx, x, y) {
    // Calculate the actual card boundary (inside the bleed)
    const cutX = x + BLEED_PX;
    const cutY = y + BLEED_PX;
    const cutRight = cutX + CARD_PORTRAIT_WIDTH;
    const cutBottom = cutY + CARD_PORTRAIT_HEIGHT;

    ctx.save();
    ctx.strokeStyle = CROP_MARK_COLOR;
    ctx.lineWidth = CROP_MARK_LINE_WIDTH;

    // Top-left corner
    ctx.beginPath();
    // Vertical line above
    ctx.moveTo(cutX, cutY - CROP_MARK_OFFSET - CROP_MARK_LENGTH);
    ctx.lineTo(cutX, cutY - CROP_MARK_OFFSET);
    // Horizontal line to left
    ctx.moveTo(cutX - CROP_MARK_OFFSET - CROP_MARK_LENGTH, cutY);
    ctx.lineTo(cutX - CROP_MARK_OFFSET, cutY);
    ctx.stroke();

    // Top-right corner
    ctx.beginPath();
    // Vertical line above
    ctx.moveTo(cutRight, cutY - CROP_MARK_OFFSET - CROP_MARK_LENGTH);
    ctx.lineTo(cutRight, cutY - CROP_MARK_OFFSET);
    // Horizontal line to right
    ctx.moveTo(cutRight + CROP_MARK_OFFSET, cutY);
    ctx.lineTo(cutRight + CROP_MARK_OFFSET + CROP_MARK_LENGTH, cutY);
    ctx.stroke();

    // Bottom-left corner
    ctx.beginPath();
    // Vertical line below
    ctx.moveTo(cutX, cutBottom + CROP_MARK_OFFSET);
    ctx.lineTo(cutX, cutBottom + CROP_MARK_OFFSET + CROP_MARK_LENGTH);
    // Horizontal line to left
    ctx.moveTo(cutX - CROP_MARK_OFFSET - CROP_MARK_LENGTH, cutBottom);
    ctx.lineTo(cutX - CROP_MARK_OFFSET, cutBottom);
    ctx.stroke();

    // Bottom-right corner
    ctx.beginPath();
    // Vertical line below
    ctx.moveTo(cutRight, cutBottom + CROP_MARK_OFFSET);
    ctx.lineTo(cutRight, cutBottom + CROP_MARK_OFFSET + CROP_MARK_LENGTH);
    // Horizontal line to right
    ctx.moveTo(cutRight + CROP_MARK_OFFSET, cutBottom);
    ctx.lineTo(cutRight + CROP_MARK_OFFSET + CROP_MARK_LENGTH, cutBottom);
    ctx.stroke();

    ctx.restore();
}
