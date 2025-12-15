"use client";

import React, { useState, useEffect } from "react";
import useRaporCaberawit from "./useRapotCaberawit";
import { Select, SelectItem } from "@heroui/react";
import { ITA } from "@/types/Rapor";

const RapotCaberawit = () => {
  const [semester, setSemester] = useState<number | "">("");
  const [tahunAjaran, setTahunAjaran] = useState<string>("");

  const { dataRapor, isLoadingRapor, refetchRapor, dataTA } = useRaporCaberawit(
    {
      semester,
      tahunAjaran,
    }
  );

  const rapor = dataRapor?.data.indikator || [];
  const caberawit = dataRapor?.data.caberawit;

  // Re-fetch saat filter berubah
  useEffect(() => {
    if (caberawit) refetchRapor();
  }, [semester, tahunAjaran, caberawit, refetchRapor]);

  if (isLoadingRapor) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER CABERAWIT */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-1">Rapor Caberawit</h2>
        {caberawit ? (
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Nama: <span className="font-semibold">{caberawit.nama}</span>
            </p>
            <p>
              Kelas:{" "}
              <span className="font-semibold">
                {caberawit.kelasJenjang?.name}
              </span>
            </p>

            {/* FILTER SEMESTER & TAHUN AJARAN */}
            <div className="flex space-x-4 mt-2">
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
                    { key: "1", label: "1" },
                    { key: "2", label: "2" },
                  ]}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>

                {/* TAHUN AJARAN */}
                <Select
                  className="w-full sm:w-48 min-w-[120px]"
                  size="sm"
                  placeholder="Tahun Ajaran"
                  selectedKeys={
                    tahunAjaran ? new Set([tahunAjaran]) : new Set()
                  }
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
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Data caberawit tidak ditemukan
          </p>
        )}
      </div>

      {/* TABEL RAPOR */}
      <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3 font-semibold w-[50px] text-center">
                No
              </th>
              <th className="border p-3 font-semibold">Indikator</th>
              <th className="border p-3 font-semibold text-center w-[140px]">
                Status
              </th>
              <th className="border p-3 font-semibold text-center w-[120px]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {rapor.length ? (
              rapor.map(
                (
                  item: {
                    indikatorId: string;
                    indikator: string;
                    status: string | null;
                    raporId: string | null;
                  },
                  i: number
                ) => (
                  <tr key={item.indikatorId} className="hover:bg-gray-50">
                    <td className="border p-3 text-center">{i + 1}</td>
                    <td className="border p-3">{item.indikator}</td>
                    <td className="border p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
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
                    <td className="border p-3 text-center space-x-3">
                      <button
                        onClick={() => console.log("edit", item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      {item.raporId && (
                        <button
                          onClick={() => console.log("hapus", item)}
                          className="text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border p-4 text-center text-gray-500"
                >
                  Belum ada rapor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RapotCaberawit;
