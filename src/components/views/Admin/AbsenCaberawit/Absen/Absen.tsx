"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IGenerus } from "@/types/Generus";
import { useSearchParams } from "next/navigation";
import useAbsenCaberawit from "../useAbsenCaberawit";
import useAbsenMassal from "./useAbsenMassal";
import { IAbsen, AbsenItem } from "@/types/Absen";
import useAbsenByTanggal from "./useAbsenByTanggal";

type StatusAbsen = "HADIR" | "IZIN" | "SAKIT" | "ALPA";

const STATUS_LIST: StatusAbsen[] = ["HADIR", "IZIN", "SAKIT", "ALPA"];

const Absen: React.FC = () => {
  const searchParams = useSearchParams();
  const tanggal = searchParams.get("tanggal") ?? undefined;
  const hasParams = !!tanggal;

  const { dataGenerus, isLoadingGenerus } = useAbsenCaberawit();
  const { mutateAbsenMassal, isPending } = useAbsenMassal();
  const { data: dataAbsen } = useAbsenByTanggal(tanggal);

  const [attendance, setAttendance] = useState<Record<number, StatusAbsen>>({});

  // 🔒 biar tidak reset pas refetch
  const initializedRef = useRef(false);

  /* =========================
     INIT ABSEN (ONCE)
  ========================= */
  useEffect(() => {
    if (!dataGenerus?.data) return;

    const initial: Record<number, StatusAbsen> = {};

    // 1️⃣ default ALPA
    dataGenerus.data.forEach((g: IGenerus) => {
      if (!g.id) return;
      initial[g.id] = "ALPA";
    });

    const absenList = dataAbsen?.data?.data;

    if (Array.isArray(absenList)) {
      absenList.forEach((absen: AbsenItem) => {
        if (absen.caberawitId) {
          initial[absen.caberawitId] = absen.status;
        }
      });
    }

    setAttendance(initial);
  }, [dataGenerus, dataAbsen]);

  /* =========================
     CHANGE STATUS
  ========================= */
  const onChangeStatus = useCallback((id: number, status: StatusAbsen) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  }, []);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = () => {
    if (!tanggal) return;

    const payload: IAbsen = {
      tanggal: searchParams.get("tanggal")!,
      list: Object.entries(attendance).map(([id, status]) => ({
        caberawitId: Number(id),
        status,
      })),
    };

    mutateAbsenMassal(payload);
  };

  if (!hasParams) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-xl font-semibold mb-1">Absen Caberawit</h1>
      <p className="text-sm text-gray-500 mb-4">
        Tanggal: <b>{tanggal}</b>
      </p>

      {isLoadingGenerus ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border p-2 text-left">Nama</th>
                <th className="border p-2 text-left">Jenjang</th>
                <th className="border p-2 text-center">Kehadiran</th>
              </tr>
            </thead>

            <tbody>
              {dataGenerus?.data?.map((g: IGenerus) => {
                if (!g.id) return null;

                const current = attendance[g.id] ?? "ALPA";

                return (
                  <tr key={g.id} className="hover:bg-gray-50">
                    <td className="border p-2">{g.nama ?? "-"}</td>
                    <td className="border p-2">{g.jenjang?.name ?? "-"}</td>
                    <td className="border p-2">
                      <div className="flex justify-center gap-4">
                        {STATUS_LIST.map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-1 cursor-pointer text-sm"
                          >
                            <input
                              type="radio"
                              name={`absen-${g.id}`}
                              checked={current === status}
                              onChange={() => onChangeStatus(g.id!, status)}
                            />

                            {status}
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ACTION */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Simpan Absen"}
        </button>
      </div>

      {/* DEBUG */}
      <pre className="mt-4 text-xs bg-black text-green-400 p-3 rounded">
        {JSON.stringify(attendance, null, 2)}
      </pre>
    </div>
  );
};

export default Absen;
