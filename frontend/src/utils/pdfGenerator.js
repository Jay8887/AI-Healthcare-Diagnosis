import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePredictionPDF = (history) => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===== Header =====
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AI Healthcare Diagnosis", 14, 15);

  doc.setFontSize(11);
  doc.text("Prediction History Report", 14, 23);

  // ===== Report Information =====
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(`Generated On : ${new Date().toLocaleString()}`, 14, 40);
  doc.text(`Total Predictions : ${history.length}`, 14, 47);

  // ===== Average Confidence =====
  let avg = 0;

  if (history.length > 0) {
    avg =
      history.reduce((sum, item) => sum + item.confidence, 0) /
      history.length;
  }

  doc.text(`Average Confidence : ${avg.toFixed(2)}%`, 14, 54);

  // ===== Table =====
  autoTable(doc, {
    startY: 62,

    head: [[
      "Disease",
      "Risk",
      "Confidence",
      "Symptoms",
      "Recommendation",
      "Date"
    ]],

    body: history.map((item) => [
      item.prediction,
      item.riskLevel,
      `${item.confidence}%`,
      item.symptoms || "-",
      item.recommendation || "-",
      new Date(item.createdAt).toLocaleDateString(),
    ]),

    theme: "striped",

    styles: {
      fontSize: 9,
      cellPadding: 3,
      valign: "middle",
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  // ===== Footer =====
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      `AI Healthcare Diagnosis System`,
      14,
      287
    );

    doc.text(
      `Page ${i} of ${pageCount}`,
      170,
      287
    );
  }

  doc.save("AI_Healthcare_Report.pdf");
};