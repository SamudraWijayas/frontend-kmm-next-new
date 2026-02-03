import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { GroupedIndikator } from "@/types/Indikator";

type RaporValue = {
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  status: string;
};

export async function exportRapotStyledExcel(
  groupedIndikator: GroupedIndikator[],
  raporMap: Map<string, RaporValue>
) {
  /* ================= LOAD TEMPLATE ================= */
  const response = await fetch("/templates/template.xlsx");
  const bufferTemplate = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(bufferTemplate);

  const sheet = workbook.getWorksheet(1);
  if (!sheet) {
    throw new Error("Sheet tidak ditemukan");
  }

  /* ================= START POSITION ================= */
  let row = 6; // BARIS PERTAMA DATA (SESUAI TEMPLATE)
  let no = 1;

  /* ================= ISI DATA ================= */
  groupedIndikator.forEach((mata) => {
    // ===== BARIS MATA PELAJARAN =====
    sheet.getCell(`A${row}`).value = no++;
    sheet.getCell(`B${row}`).value = mata.name;
    row++;

    mata.kategori.forEach((kat) => {
      // ===== BARIS KATEGORI =====
      sheet.getCell(`B${row}`).value = kat.name;
      row++;

      kat.indikator.forEach((ind, idx) => {
        const rapor = raporMap.get(ind.id);

        // ===== BARIS INDIKATOR =====
        sheet.getCell(`A${row}`).value = "";
        sheet.getCell(`B${row}`).value =
          `${String.fromCharCode(97 + idx)}. ${ind.name}`;

        sheet.getCell(`C${row}`).value =
          rapor?.nilaiPengetahuan ?? "";

        sheet.getCell(`D${row}`).value =
          rapor?.nilaiKeterampilan ?? "";

        sheet.getCell(`E${row}`).value =
          rapor?.status === "TUNTAS"
            ? "Tuntas"
            : rapor?.status === "TIDAK_TUNTAS"
            ? "Tidak Tuntas"
            : "";

        row++;
      });
    });
  });

  /* ================= DOWNLOAD ================= */
  const outputBuffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([outputBuffer]),
    `Rapot_Caberawit_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}
