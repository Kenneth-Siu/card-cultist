import { EXCLUDED_BACK_TYPES } from "./pdfExportConfig";

/**
 * Collects all card faces that should be included in the print PDF.
 *
 * Rules:
 * - Skip blank faces (type "None")
 * - For back faces, also skip excluded types (Mythos, Player, Player Landscape)
 * - Include everything else
 *
 * @param {CardSet} cardSet - The card set to collect faces from
 * @returns {Array<{face: CardFace, card: Card, side: string, index: number}>}
 */
export default function collectPrintFaces(cardSet) {
    const faces = [];

    cardSet.cards.forEach((card, cardIndex) => {
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
    });

    return faces;
}
