import React from "react";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import jsPDF from "jspdf";

export default function ExportButtons({ summary, label = "Export" }) {
  const toCSV = () => {
    const ws = utils.json_to_sheet([summary]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Summary");
    const buf = write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, `${label.replace(/\s+/g, "_")}.xlsx`);
  };

  const toPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(label, 20, 20);
    let y = 30;
    for (const [k, v] of Object.entries(summary || {})) {
      doc.text(`${k}: ${v}`, 20, y);
      y += 8;
    }
    doc.save(`${label.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="flex gap-2">
      <button onClick={toCSV} className="px-3 py-1 border rounded">
        Excel
      </button>
      <button onClick={toPDF} className="px-3 py-1 border rounded">
        PDF
      </button>
    </div>
  );
}
