import { EXCLUDED_BACK_TYPES } from "./pdfExportConfig";

/**
 * Collects all card faces that should be included in the print PDF.
 *
 * Rules:
 * - Skip blank faces (type "None")
 * - For back faces, also skip excluded types (Mythos, Player, Player Landscape)
 * - Duplicate cards based on numOfCopies property
 * - Include everything else
 *
 * @param {CardSet} cardSet - The card set to collect faces from
 * @returns {Array<{face: CardFace, card: Card, side: string, index: number}>}
 */
export default function collectPrintFaces(cardSet) {
    const faces = [];

    cardSet.cards.forEach((card, cardIndex) => {
        const numOfCopies = card.numOfCopies || 1;

        // Add a copy for each numOfCopies
        for (let copyNum = 0; copyNum < numOfCopies; copyNum++) {
            // Check front face
            if (card.frontFace && card.frontFace.type !== "None") {
                faces.push({
                    face: card.frontFace,
                    card: card,
                    side: "front",
                    cardIndex: cardIndex
                });
            }

            // Check back face with additional exclusions
            if (card.backFace && card.backFace.type !== "None") {
                if (!EXCLUDED_BACK_TYPES.includes(card.backFace.type)) {
                    faces.push({
                        face: card.backFace,
                        card: card,
                        side: "back",
                        cardIndex: cardIndex
                    });
                }
            }
        }
    });

    return faces;
}

/**
 * Collects card faces grouped for double-sided printing.
 *
 * Returns an object with fronts and backs arrays, where each entry includes
 * a pairIndex to link fronts with their corresponding backs.
 *
 * Rules:
 * - Front faces always included (if not blank)
 * - Back faces included unless blank or excluded type
 * - If back is excluded, front still included but back slot left empty
 * - Each card copy gets unique pairIndex for alignment
 *
 * @param {CardSet} cardSet - The card set to collect faces from
 * @returns {{fronts: Array, backs: Array}}
 */
export function collectPrintFacesGrouped(cardSet) {
    const fronts = [];
    const backs = [];
    let pairIndex = 0;

    cardSet.cards.forEach((card, cardIndex) => {
        const numOfCopies = card.numOfCopies || 1;

        for (let copyNum = 0; copyNum < numOfCopies; copyNum++) {
            const hasFront = card.frontFace && card.frontFace.type !== "None";
            const hasBack = card.backFace &&
                           card.backFace.type !== "None" &&
                           !EXCLUDED_BACK_TYPES.includes(card.backFace.type);

            if (hasFront) {
                fronts.push({
                    face: card.frontFace,
                    card: card,
                    side: "front",
                    cardIndex: cardIndex,
                    pairIndex: pairIndex
                });

                // Add back if it exists, otherwise leave slot empty for alignment
                if (hasBack) {
                    backs.push({
                        face: card.backFace,
                        card: card,
                        side: "back",
                        cardIndex: cardIndex,
                        pairIndex: pairIndex
                    });
                } else {
                    // Empty slot to maintain alignment
                    backs.push({
                        face: null,
                        card: card,
                        side: "back",
                        cardIndex: cardIndex,
                        pairIndex: pairIndex,
                        isEmpty: true
                    });
                }

                pairIndex++;
            }
        }
    });

    return { fronts, backs };
}
