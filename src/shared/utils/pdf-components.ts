import path from "path";
import { getDateFormatTimezone } from "./date-format";

export function generateHeader(doc: PDFKit.PDFDocument, title: string) {
  doc
    .image(path.resolve("public/assets/logo_pichari.png"), 50, 45, {
      width: 50,
    })
    .fillColor("#444444")
    .fontSize(20)
    .text(title, 110, 57)
    .fontSize(10)
    .text(getDateFormatTimezone(new Date().toJSON()), 200, 65, {
      align: "right",
    })
    .moveDown();
}

export function generateFooter(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(10).text(text, 50, 780, { align: "center", width: 500 });
}

export function generateTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  col1: any,
  col2: string,
  col3: string,
  col4: string,
  col5: any
) {
  doc
    .fontSize(10)
    .text(col1, 50, y, { width: 120 })
    .text(col2, 160, y, { width: 120 })
    .fontSize(8.7)
    .text(col3, 270, y, { width: 240, align: "left" })
    .fontSize(10)
    .text(col4, 520, y, { width: 150, align: "left" })
    .text(col5, 680, y, { width: 100, align: "left" });
}

export function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(780, y).stroke();
}

export function formatCurrency(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}
