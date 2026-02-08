import { CARD_PORTRAIT_WIDTH, CARD_PORTRAIT_HEIGHT } from "../../pages/card/cardConstants";

// Bleed size: 3mm at 300 DPI ≈ 35 pixels
export const BLEED_PX = 35;

// Card dimensions with bleed
export const CARD_WITH_BLEED_WIDTH = CARD_PORTRAIT_WIDTH + 2 * BLEED_PX;   // 820
export const CARD_WITH_BLEED_HEIGHT = CARD_PORTRAIT_HEIGHT + 2 * BLEED_PX; // 1120

// Paper configurations at 300 DPI
export const PAPER_CONFIGS = {
    a4: {
        width: 2480,
        height: 3508,
        cols: 3,
        rows: 3,
        label: "A4"
    },
    letter: {
        width: 2551,
        height: 3295,
        cols: 3,
        rows: 2,
        label: "US Letter"
    }
};

// Back face types to exclude from PDF export
export const EXCLUDED_BACK_TYPES = [
];

// Crop mark settings
export const CROP_MARK_LENGTH = 30;
export const CROP_MARK_OFFSET = 10;
export const CROP_MARK_COLOR = "#FF0000";
export const CROP_MARK_LINE_WIDTH = 2;
