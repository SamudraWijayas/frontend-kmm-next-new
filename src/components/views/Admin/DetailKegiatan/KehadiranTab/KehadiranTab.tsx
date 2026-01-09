"use client";

import React, { ReactNode, useCallback } from "react";
import { Card, CardHeader, Chip, Avatar } from "@heroui/react";
import { IKegiatan, Peserta } from "@/types/Kegiatan";
import DataTable from "@/components/ui/DataTable";

interface PropTypes {
  dataKegiatan: {
    kegiatan: IKegiatan;
    peserta: Peserta[];
  } | null;
  isLoading?: boolean;
}

const COLUMN_LIST_PESERTA = [
  { name: "FOTO", uid: "foto" },
  { name: "NAMA", uid: "nama" },
  { name: "JENJANG", uid: "jenjang" },
  { name: "JENIS KELAMIN", uid: "jenis_kelamin" },
  { name: "KELOMPOK", uid: "kelompok" },
  { name: "DESA", uid: "desa" },
  { name: "STATUS", uid: "status" },
];

const KehadiranTab = ({ dataKegiatan, isLoading = false }: PropTypes) => {
  const kegiatan = dataKegiatan?.kegiatan;
  const peserta = dataKegiatan?.peserta || [];

  type StatusAbsen = "HADIR" | "TERLAMBAT" | "TIDAK_HADIR";
  interface Item {
    status: StatusAbsen;
  }
  const statusColorMap: Record<StatusAbsen, "success" | "warning" | "danger"> =
    {
      HADIR: "success",
      TERLAMBAT: "warning",
      TIDAK_HADIR: "danger",
    };

  // 🔹 renderCell sesuai kolom
  const renderCell = useCallback(
    (item: Peserta, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Peserta];

      switch (columnKey) {
        case "foto":
          return item.foto ? (
            <Avatar src={item.foto} alt={item.nama} size="md" radius="full" />
          ) : (
            <Avatar
              name={item.nama?.charAt(0) ?? "?"}
              size="md"
              radius="full"
              color="default"
            />
          );

        case "jenjang":
          return item.jenjang?.name || "-";

        case "kelompok":
          return item.kelompok?.name || "-";

        case "desa":
          return item.desa?.name || "-";

        case "status":
          return (
            <Chip
              color={statusColorMap[item.status as keyof typeof statusColorMap]}
              variant="flat"
              size="sm"
            >
              {item.status}
            </Chip>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [statusColorMap]
  );

  return (
    <div className="py-6 space-y-8">
      {/* 🔹 Info Kegiatan */}
      <Card shadow="sm" className="bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="flex flex-col items-start gap-2">
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-6 w-48 bg-gray-300 rounded-lg" />
              <div className="h-4 w-64 bg-gray-200 rounded-lg" />
              <div className="h-4 w-40 bg-gray-200 rounded-lg" />
            </div>
          ) : kegiatan ? (
            <>
              <h2 className="text-2xl font-bold text-blue-700">
                {kegiatan.name}
              </h2>
              <div className="text-gray-600 text-sm">
                <p>
                  {kegiatan.startDate
                    ? new Date(kegiatan.startDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}{" "}
                  -{" "}
                  {kegiatan.endDate
                    ? new Date(kegiatan.endDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>

                <p>
                  📍 Lokasi:{" "}
                  <span className="font-medium">
                    {kegiatan.desa?.name || "-"}
                  </span>{" "}
                  | 🏷️ Tingkat:{" "}
                  <span className="font-medium">{kegiatan.tingkat}</span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Data kegiatan tidak ditemukan.</p>
          )}
        </CardHeader>
      </Card>

      <DataTable
        columns={COLUMN_LIST_PESERTA}
        data={peserta as unknown as Record<string, unknown>[]} // ✅ cast aman
        renderCell={
          renderCell as unknown as (
            item: Record<string, unknown>,
            columnKey: React.Key
          ) => ReactNode
        } // ✅ cast biar cocok sama prop
        emptyContent="Belum ada peserta terdaftar."
        isLoading={isLoading}
        totalPages={1}
        showSearch={false}
      />
    </div>
  );
};

export default KehadiranTab;
