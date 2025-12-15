// utils/exportRaport.ts
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ICaberawit {
  nama: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  gol_darah: string;
  nama_ortu: string;
  kelasJenjang: { name: string };
  jenjang: { name: string };
  daerah: { name: string };
  desa: { name: string };
  kelompok: { name: string };
}

interface IIndikator {
  indikatorId: string;
  indikator: string;
  status: string | null;
}

export const exportRaport = async (
  caberawit: ICaberawit,
  indikator: IIndikator[],
  semester: number,
  tahunAjaran: string
) => {
  const workbook = new ExcelJS.Workbook();

  // ---------------- Cover Sheet ----------------
  const cover = workbook.addWorksheet("Cover");

  // Try to fetch logo from public folder and embed into the cover sheet.
  // Fallback to not adding an image if fetch fails.
  try {
    const logoPaths = [
      "/images/logo/logo-light.png",
      "/images/logo/logo-dark.png",
    ];
    for (const path of logoPaths) {
      try {
        const res = await fetch(path);
        if (!res.ok) continue;
        const arrayBuffer = await res.arrayBuffer();
        const blob = new Blob([arrayBuffer], {
          type: res.headers.get("content-type") || "image/png",
        });
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        const base64 = dataUrl.split(",")[1] || "";
        const logoImageId = workbook.addImage({ base64, extension: "png" });
        cover.addImage(logoImageId, {
          tl: { col: 0, row: 0 },
          ext: { width: 150, height: 80 },
        });
        break;
      } catch (err) {
        console.debug("exportRaport: logo fetch failed for path", path, err);
        continue;
      }
    }
  } catch (err) {
    // don't block export on logo errors
    console.debug("exportRaport: logo not embedded", err);
  }

  // Judul dengan merge
  cover.mergeCells("B2", "E2");
  const titleRow = cover.getCell("B2");
  titleRow.value = "LAPORAN PENCAPAIAN KOMPETENSI SANTRI";
  titleRow.font = { bold: true, size: 16 };
  titleRow.alignment = { horizontal: "center" };
  cover.getRow(3).height = 5;

  cover.mergeCells("B3", "E3");
  const tpqRow = cover.getCell("B3");
  tpqRow.value = "TAMAN PENDIDIKAN ALQURAN";
  tpqRow.font = { bold: true, size: 14 };
  tpqRow.alignment = { horizontal: "center" };

  cover.addRow([]);
  cover.addRow(["Nama TPQ / TPA", ":", caberawit.nama]);
  cover.addRow([
    "Alamat",
    ":",
    caberawit.desa.name + ", " + caberawit.daerah.name,
  ]);
  cover.addRow([
    "Kelas / Jenjang",
    ":",
    caberawit.kelasJenjang.name + " / " + caberawit.jenjang.name,
  ]);
  cover.addRow([
    "Semester / Tahun",
    ":",
    `Semester ${semester} / ${tahunAjaran}`,
  ]);

  // ---------------- Identitas Sheet ----------------
  const identitas = workbook.addWorksheet("Identitas");
  identitas.addRow(["Identitas Caberawit"]).font = { bold: true, size: 16 };
  identitas.addRow([]);
  identitas.addRow(["Nama", caberawit.nama]);
  identitas.addRow([
    "Tanggal Lahir",
    new Date(caberawit.tgl_lahir).toLocaleDateString(),
  ]);
  identitas.addRow(["Jenis Kelamin", caberawit.jenis_kelamin]);
  identitas.addRow(["Golongan Darah", caberawit.gol_darah]);
  identitas.addRow(["Nama Orang Tua", caberawit.nama_ortu]);
  identitas.addRow(["Kelas", caberawit.kelasJenjang.name]);
  identitas.addRow(["Jenjang", caberawit.jenjang.name]);
  identitas.addRow(["Daerah", caberawit.daerah.name]);
  identitas.addRow(["Desa", caberawit.desa.name]);
  identitas.addRow(["Kelompok", caberawit.kelompok.name]);

  // ---------------- Nilai Sheet ----------------
  const nilai = workbook.addWorksheet("Nilai");
  const header = nilai.addRow(["No", "Indikator", "Status"]);
  header.font = { bold: true };

  header.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "center" };
  });

  indikator.forEach((item, idx) => {
    const row = nilai.addRow([idx + 1, item.indikator, item.status || "-"]);
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      // Highlight status
      if (colNumber === 3) {
        if (item.status === "TUNTAS")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "C6EFCE" },
          };
        else if (item.status === "BELUM TUNTAS")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC7CE" },
          };
      }
    });
  });

  // Lebar kolom otomatis
  [nilai, identitas, cover].forEach((sheet) => {
    sheet.columns.forEach((col) => (col.width = 25));
  });

  // Generate Excel
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `Raport-${caberawit.nama}.xlsx`
  );
};
