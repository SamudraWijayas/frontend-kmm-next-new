"use client";

import React, { useState, useEffect, useMemo } from "react";
import useRaporCaberawit from "./useRapotCaberawit";
import { Select, SelectItem, useDisclosure, Button } from "@heroui/react";
import { ITA } from "@/types/Rapor";
import AddRapor from "./addRapor/addRapor";
import { exportRaport } from "@/utils/exportRaport";

interface IndikatorItem {
  indikatorId: string;
  indikator: string;
  status: string | null;
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  raporId: string | null;
  jenisPenilaian: string;
  semester: string;
  mataPelajaran: string | null;
  mataPelajaranId: string | null;
  kategoriIndikator: string;
  kategoriIndikatorId: string;
}

interface MataPelajaranGroup {
  mataPelajaran: string;
  mataPelajaranId: string;
  kategoriIndikator: string;
  kategoriIndikatorId: string;
  indikator: IndikatorItem[];
}

const RapotCaberawit = () => {
  const [semester, setSemester] = useState<number | "">("");
  const [tahunAjaran, setTahunAjaran] = useState<string>("");

  const { dataRapor, isLoadingRapor, refetchRapor, dataTA } = useRaporCaberawit(
    {
      semester,
      tahunAjaran,
    }
  );

  const caberawit = dataRapor?.data.caberawit;
  const indikatorList: IndikatorItem[] = useMemo(() => {
    if (
      !dataRapor?.data?.indikator ||
      !Array.isArray(dataRapor.data.indikator)
    ) {
      return [];
    }

    return dataRapor.data.indikator.flatMap((mp: MataPelajaranGroup) =>
      (mp.indikator || []).map((i: IndikatorItem) => ({
        ...i,
        mataPelajaran: mp.mataPelajaran,
        mataPelajaranId: mp.mataPelajaranId,
        kategoriIndikator: mp.kategoriIndikator,
        kategoriIndikatorId: mp.kategoriIndikatorId,
      }))
    );
  }, [dataRapor?.data?.indikator]);

  const groupedByMP = useMemo(() => {
    const groups: Record<
      string,
      {
        mataPelajaran: string;
        mataPelajaranId: string;
        kategoris: Record<
          string,
          {
            kategoriIndikator: string;
            kategoriIndikatorId: string;
            items: IndikatorItem[];
          }
        >;
      }
    > = {};

    indikatorList.forEach((item) => {
      const mpId = item.mataPelajaranId || "unknown";
      const kiId = item.kategoriIndikatorId || "unknown";

      if (!groups[mpId]) {
        groups[mpId] = {
          mataPelajaran: item.mataPelajaran || "",
          mataPelajaranId: item.mataPelajaranId || "",
          kategoris: {},
        };
      }
      if (!groups[mpId].kategoris[kiId]) {
        groups[mpId].kategoris[kiId] = {
          kategoriIndikator: item.kategoriIndikator,
          kategoriIndikatorId: item.kategoriIndikatorId,
          items: [],
        };
      }
      groups[mpId].kategoris[kiId].items.push(item);
    });

    return Object.values(groups);
  }, [indikatorList]);

  const addRapor = useDisclosure();

  const handleExport = () => {
    if (caberawit && groupedByMP.length > 0) {
      // transform groupedByMP sesuai interface IMataPelajaran
      const dataForExport = groupedByMP.map((mp) => ({
        mataPelajaran: mp.mataPelajaran,
        mataPelajaranId: mp.mataPelajaranId,
        kategoriIndikatorList: Object.values(mp.kategoris).map((ki) => ({
          kategoriIndikator: ki.kategoriIndikator,
          kategoriIndikatorId: ki.kategoriIndikatorId,
          items: ki.items.map((item) => ({
            indikatorId: item.indikatorId,
            indikator: item.indikator,
            status: item.status,
            nilaiPengetahuan: item.nilaiPengetahuan,
            nilaiKeterampilan: item.nilaiKeterampilan,
          })),
        })),
      }));

      exportRaport(
        caberawit,
        dataForExport,
        typeof semester === "number" ? semester : 0,
        tahunAjaran
      );
    }
  };

  useEffect(() => {
    if (caberawit) refetchRapor();
  }, [semester, tahunAjaran, caberawit, refetchRapor]);

  if (isLoadingRapor) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER CABERAWIT */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Rapor Caberawit</h2>
        <Button color="primary" variant="solid" onPress={addRapor.onOpen}>
          Tambah Rapot
        </Button>

        {caberawit ? (
          <div className="text-sm text-gray-700 space-y-2 mt-2">
            <p>
              Nama: <span className="font-semibold">{caberawit.nama}</span>
            </p>
            <p>
              Kelas:{" "}
              <span className="font-semibold">
                {caberawit.kelasJenjang?.name || "-"}
              </span>
            </p>

            <div className="flex space-x-4 mt-2">
              {/* SEMESTER */}
              <Select
                className="w-full sm:w-40 min-w-[100px]"
                size="sm"
                placeholder="Semester"
                selectedKeys={
                  semester !== "" ? new Set([semester.toString()]) : new Set()
                }
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string | undefined;
                  setSemester(selected ? Number(selected) : "");
                }}
                variant="flat"
                items={[
                  { key: "", label: "Semua" },
                  { key: "Ganjil", label: "Ganjil" },
                  { key: "Genap", label: "Genap" },
                ]}
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>

              {/* TAHUN AJARAN */}
              <Select
                className="w-full sm:w-48 min-w-[120px]"
                size="sm"
                placeholder="Tahun Ajaran"
                selectedKeys={tahunAjaran ? new Set([tahunAjaran]) : new Set()}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string | undefined;
                  setTahunAjaran(selected || "");
                }}
                variant="flat"
                items={[
                  { key: "", label: "Semua" },
                  ...(dataTA || []).map((ta: ITA) => ({
                    key: ta.id!,
                    label: ta.name!,
                  })),
                ]}
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-2">
            Data caberawit tidak ditemukan
          </p>
        )}
      </div>

      <Button color="primary" onPress={handleExport}>
        Export Raport
      </Button>

      {/* TABEL RAPOR */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 overflow-x-auto overflow-hidden">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left">
              <th className="border border-gray-200 p-3 font-semibold w-[50px] text-center">
                No
              </th>
              <th className="border border-gray-200 p-3 font-semibold">
                Materi Pengajian
              </th>
              <th className="border border-gray-200 p-3 font-semibold text-center">
                Pengetahuan
              </th>
              <th className="border border-gray-200 p-3 font-semibold text-center">
                Keterampilan
              </th>
              <th className="border border-gray-200 p-3 font-semibold text-center w-[140px]">
                Ketuntasan
              </th>
              <th className="border border-gray-200 p-3 font-semibold text-center w-[120px]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {groupedByMP.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="border border-gray-200 p-4 text-center text-gray-500"
                >
                  Belum ada rapor
                </td>
              </tr>
            )}

            {groupedByMP.map((mpGroup, mpIndex) => {
              let rowNo = 1;
              for (let i = 0; i < mpIndex; i++) {
                for (const ki of Object.values(groupedByMP[i].kategoris)) {
                  rowNo += ki.items.length;
                }
              }

              return (
                <React.Fragment key={`mp-${mpGroup.mataPelajaranId}`}>
                  {/* Mata Pelajaran Header */}
                  <tr className="bg-blue-50 hover:bg-blue-100 transition">
                    <td
                      colSpan={6}
                      className="border border-gray-200 p-3 font-bold text-blue-700"
                    >
                      {mpGroup.mataPelajaran}
                    </td>
                  </tr>

                  {/* Kategori Header & Items */}
                  {Object.values(mpGroup.kategoris).map((kiGroup, kiIndex) => (
                    <React.Fragment
                      key={`ki-${mpGroup.mataPelajaranId}-${kiIndex}`}
                    >
                      <tr className="bg-gray-100 hover:bg-gray-200 transition">
                        <td
                          colSpan={6}
                          className="border border-gray-200 p-3 pl-8 font-semibold text-gray-700"
                        >
                          {kiGroup.kategoriIndikator}
                        </td>
                      </tr>

                      {kiGroup.items.map((item, itemIndex) => (
                        <tr
                          key={item.indikatorId}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="border border-gray-200 p-3 text-center">
                            {rowNo + itemIndex}
                          </td>

                          <td className="border border-gray-200 p-3 whitespace-nowrap">
                            {item.indikator}
                          </td>

                          <td className="border border-gray-200 p-3 text-center whitespace-nowrap">
                            {item.nilaiPengetahuan ?? ""}
                          </td>

                          <td className="border border-gray-200 p-3 text-center whitespace-nowrap">
                            {item.nilaiKeterampilan ?? ""}
                          </td>

                          <td className="border border-gray-200 p-3 text-center whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium  ${
                                item.status === "TUNTAS"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "TIDAK_TUNTAS"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {item.status ?? "Belum dinilai"}
                            </span>
                          </td>

                          <td className="border border-gray-200 p-3 text-center space-x-3">
                            <button
                              onClick={() => console.log("edit", item)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>

                            {item.raporId && (
                              <button
                                onClick={() => console.log("hapus", item)}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Hapus
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddRapor {...addRapor} refetchRapor={refetchRapor} />
    </div>
  );
};

export default RapotCaberawit;
