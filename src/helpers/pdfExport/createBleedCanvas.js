/**
 * Creates a new canvas with bleed margins by mirroring the edge pixels outward.
 *
 * The bleed is created by:
 * 1. Drawing the original card in the center
 * 2. Mirroring the top edge (flipped vertically) above the card
 * 3. Mirroring the bottom edge (flipped vertically) below the card
 * 4. Mirroring the left edge (flipped horizontally) to the left
 * 5. Mirroring the right edge (flipped horizontally) to the right
 * 6. Mirroring each corner (flipped both ways) into the corner bleed areas
 *
 * @param {HTMLCanvasElement} sourceCanvas - The original card canvas
 * @param {number} bleedPx - The bleed size in pixels
 * @returns {HTMLCanvasElement} - New canvas with bleed applied
 */
export default function createBleedCanvas(sourceCanvas, bleedPx) {
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const newWidth = width + 2 * bleedPx;
    const newHeight = height + 2 * bleedPx;

    // Create new canvas with bleed dimensions
    const bleedCanvas = document.createElement("canvas");
    bleedCanvas.width = newWidth;
    bleedCanvas.height = newHeight;
    const ctx = bleedCanvas.getContext("2d");

    // Draw original card in center
    ctx.drawImage(sourceCanvas, bleedPx, bleedPx);

    // === MIRROR EDGES ===

    // Top edge: take top strip, flip vertically, draw above
    ctx.save();
    ctx.translate(bleedPx, bleedPx);
    ctx.scale(1, -1);
    ctx.drawImage(
        sourceCanvas,
        0, 0, width, bleedPx,          // source: top strip
        0, 0, width, bleedPx           // dest: flipped above
    );
    ctx.restore();

    // Bottom edge: take bottom strip, flip vertically, draw below
    ctx.save();
    ctx.translate(bleedPx, newHeight);
    ctx.scale(1, -1);
    ctx.drawImage(
        sourceCanvas,
        0, height - bleedPx, width, bleedPx,  // source: bottom strip
        0, 0, width, bleedPx                   // dest: flipped below
    );
    ctx.restore();

    // Left edge: take left strip, flip horizontally, draw left
    ctx.save();
    ctx.translate(bleedPx, bleedPx);
    ctx.scale(-1, 1);
    ctx.drawImage(
        sourceCanvas,
        0, 0, bleedPx, height,         // source: left strip
        0, 0, bleedPx, height          // dest: flipped to left
    );
    ctx.restore();

    // Right edge: take right strip, flip horizontally, draw right
    ctx.save();
    ctx.translate(newWidth, bleedPx);
    ctx.scale(-1, 1);
    ctx.drawImage(
        sourceCanvas,
        width - bleedPx, 0, bleedPx, height,  // source: right strip
        0, 0, bleedPx, height                  // dest: flipped to right
    );
    ctx.restore();

    // === MIRROR CORNERS (flip both axes) ===

    // Top-left corner
    ctx.save();
    ctx.translate(bleedPx, bleedPx);
    ctx.scale(-1, -1);
    ctx.drawImage(
        sourceCanvas,
        0, 0, bleedPx, bleedPx,
        0, 0, bleedPx, bleedPx
    );
    ctx.restore();

    // Top-right corner
    ctx.save();
    ctx.translate(newWidth, bleedPx);
    ctx.scale(-1, -1);
    ctx.drawImage(
        sourceCanvas,
        width - bleedPx, 0, bleedPx, bleedPx,
        0, 0, bleedPx, bleedPx
    );
    ctx.restore();

    // Bottom-left corner
    ctx.save();
    ctx.translate(bleedPx, newHeight);
    ctx.scale(-1, -1);
    ctx.drawImage(
        sourceCanvas,
        0, height - bleedPx, bleedPx, bleedPx,
        0, 0, bleedPx, bleedPx
    );
    ctx.restore();

    // Bottom-right corner
    ctx.save();
    ctx.translate(newWidth, newHeight);
    ctx.scale(-1, -1);
    ctx.drawImage(
        sourceCanvas,
        width - bleedPx, height - bleedPx, bleedPx, bleedPx,
        0, 0, bleedPx, bleedPx
    );
    ctx.restore();

    return bleedCanvas;
}
