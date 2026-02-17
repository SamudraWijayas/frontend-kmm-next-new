// utils/exportGenerusExcel.ts

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IGenerus } from "@/types/Generus";

const calculateAge = (date?: string | null): number | "-" => {
  if (!date) return "-";

  const birthDate = new Date(date);
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

export const exportGenerusToExcel = async (
  data: IGenerus[],
  fileName = "Data-Generus"
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Generus");

  // ================= HEADER =================
  worksheet.columns = [
    { header: "Nama", key: "nama", width: 25 },
    { header: "Tanggal Lahir", key: "tgl_lahir", width: 18 },
    { header: "Umur", key: "umur", width: 10 },
    { header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
    { header: "Jenjang", key: "jenjang", width: 18 },
    { header: "Desa", key: "desa", width: 18 },
    { header: "Daerah", key: "daerah", width: 18 },
    { header: "Kelompok", key: "kelompok", width: 18 },
    { header: "Mahasiswa", key: "mahasiswa", width: 15 },
  ];

  // Style header
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

  // ================= DATA =================
  data.forEach((item) => {
    worksheet.addRow({
      nama: item.nama ?? "-",
      tgl_lahir: item.tgl_lahir
        ? new Date(item.tgl_lahir).toLocaleDateString("id-ID")
        : "-",
      umur: calculateAge(item.tgl_lahir),
      jenis_kelamin: item.jenis_kelamin ?? "-",
      jenjang: item.jenjang?.name ?? "-",
      desa: item.desa?.name ?? "-",
      daerah: item.daerah?.name ?? "-",
      kelompok: item.kelompok?.name ?? "-",
      mahasiswa: item.mahasiswa ? "Aktif" : "Tidak Aktif",
    });
  });

  // ================= BORDER =================
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // ================= DOWNLOAD =================
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
