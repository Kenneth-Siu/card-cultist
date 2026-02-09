import React, { useEffect, useContext, lazy, Suspense } from "react";
import { CampaignContext } from "../../../components/CampaignContext";

// Lazy load CardExporter to avoid triggering all card face imports at module load time
const CardExporter = lazy(() => import("../../cardSet/components/CardExporter"));

/**
 * Hidden component that renders CardExporter for a specific CardSet
 * to prepare canvases for PDF export.
 *
 * @param {string|null} currentCardSetId - The ID of the card set to render, or null to cleanup
 * @param {function} onCanvasesReady - Callback when canvases are ready for export
 */
export default function CampaignPdfExporter({ currentCardSetId, onCanvasesReady }) {
    const { campaign } = useContext(CampaignContext);

    useEffect(() => {
        if (!currentCardSetId) return;

        // Poll for canvases to be ready AND have content rendered
        const checkCanvases = () => {
            const canvases = document.querySelectorAll(".export-card-front-canvases-container canvas");

            if (canvases.length === 0) {
                // No canvases yet, keep waiting
                setTimeout(checkCanvases, 50);
                return;
            }

            // Check if canvases have content (images loaded)
            let allCanvasesReady = true;
            for (let canvas of canvases) {
                const ctx = canvas.getContext("2d");
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // Check if canvas has any non-transparent pixels
                let hasContent = false;
                for (let i = 3; i < imageData.data.length; i += 4) {
                    if (imageData.data[i] > 0) {
                        hasContent = true;
                        break;
                    }
                }

                if (!hasContent) {
                    allCanvasesReady = false;
                    break;
                }
            }

            if (allCanvasesReady) {
                // All canvases have content, ready to export
                setTimeout(() => {
                    if (onCanvasesReady) {
                        onCanvasesReady();
                    }
                    if (window._campaignPdfExportResolve) {
                        window._campaignPdfExportResolve();
                        window._campaignPdfExportResolve = null;
                    }
                }, 200); // Slightly longer delay to ensure everything is settled
            } else {
                // Some canvases still loading, keep waiting
                setTimeout(checkCanvases, 100);
            }
        };
        checkCanvases();
    }, [currentCardSetId, onCanvasesReady]);

    // Don't render anything if no card set selected
    if (!currentCardSetId) {
        return null;
    }

    // Find the card set to render
    const cardSet = campaign.cardSets.find(cs => cs.id === currentCardSetId);
    if (!cardSet) {
        return null;
    }

    // Render CardExporter in hidden container with Suspense for lazy loading
    return (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <CardExporter cardSet={cardSet} />
            </Suspense>
        </div>
    );
}
