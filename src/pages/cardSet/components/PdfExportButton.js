import React, { useState } from "react";
import { PAPER_CONFIGS } from "../../../helpers/pdfExport/pdfExportConfig";
import exportPdf from "./exportPdf";
import exportPdfNoCrop from "./exportPdfNoCrop";

export default function PdfExportButton({ cardSet }) {
    const [paperSize, setPaperSize] = useState("a4");
    const [exporting, setExporting] = useState(false);

    async function handleExport() {
        setExporting(true);
        try {
            await exportPdf(cardSet, paperSize);
        } catch (error) {
            console.error("PDF export failed:", error);
            alert("PDF export failed. See console for details.");
        } finally {
            setExporting(false);
        }
    }

    async function handleExportNoCrop() {
        setExporting(true);
        try {
            await exportPdfNoCrop(cardSet);
        } catch (error) {
            console.error("PDF export failed:", error);
            alert("PDF export failed. See console for details.");
        } finally {
            setExporting(false);
        }
    }

    return (
        <span className="pdf-export-controls">
            <select
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
                disabled={exporting}
            >
                {Object.entries(PAPER_CONFIGS).map(([key, config]) => (
                    <option key={key} value={key}>
                        {config.label}
                    </option>
                ))}
            </select>
            <button onClick={handleExport} disabled={exporting}>
                {exporting ? "Exporting..." : "Export for Print (PDF)"}
            </button>
            <button onClick={handleExportNoCrop} disabled={exporting}>
                {exporting ? "Exporting..." : "Export for Print - No Crop (PDF)"}
            </button>
        </span>
    );
}
