"use client";
import React from "react";
import useMurid from "./useMurid";
import { EllipsisVertical, FolderPlus, Trash2 } from "lucide-react";
import { ICaberawit, IMurid } from "@/types/Caberawit";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import AddMurid from "./AddMurid/AddMurid";
import DeleteMurid from "./DeleteMurid/DeleteMurid";
import Link from "next/link";

const Murid = () => {
  const {
    dataMurid,
    isLoadingMurid,
    isRefetchingMurid,
    refetchMurid,

    selectedIds,
    setSelectedIds,
    selectedId,
    setSelectedId,
  } = useMurid();
  const addMurid = useDisclosure();
  const deleteMurid = useDisclosure();

  const muridList = dataMurid?.data ?? [];

  if (isLoadingMurid) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="">
      {muridList.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="flex flex-col items-center justify-center text-center h-[60vh]">
          <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <FolderPlus className="text-white w-6 h-6" />
          </div>

          <h2 className="text-lg font-semibold text-black">Belum ada Murid</h2>

          <p className="text-gray-600 mt-1 max-w-sm">
            Kamu belum menambahkan data murid. Silakan tambahkan murid baru.
          </p>

          <button
            onClick={addMurid.onOpen}
            className="mt-6 px-5 py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer"
          >
            Tambah Murid
          </button>
        </div>
      ) : (
        /* ================= LIST DATA ================= */
        <div>
          <div className="flex gap-3">
            <button
              onClick={addMurid.onOpen}
              className="mb-6 px-5 py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer"
            >
              Tambah Murid
            </button>
            <button
              disabled={selectedIds.length === 0}
              onClick={() => deleteMurid.onOpen()}
              className="mb-6 px-5 py-2 rounded-lg bg-red-500 text-white"
            >
              Hapus ({selectedIds.length})
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {muridList.map((murid: IMurid) => {
              const initial = murid.nama?.charAt(0).toUpperCase();
              const isSelected = selectedIds.includes(murid.id);

              return (
                <div
                  key={murid.id}
                  className={`group relative rounded-2xl border bg-white p-5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${
          isSelected
            ? "border-[#293c88] ring-2 ring-[#293c88]/20 -translate-y-2"
            : "border-gray-200"
        }`}
                >
                  {/* ===== HEADER ===== */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#293c88] text-white flex items-center justify-center font-semibold text-lg">
                        {initial}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {murid.nama}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {murid.jenis_kelamin} • {murid.jenjang?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={(checked) => {
                          setSelectedIds((prev) =>
                            checked
                              ? [...prev, murid.id]
                              : prev.filter((id) => id !== murid.id),
                          );
                        }}
                        color="primary"
                        radius="sm"
                      />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <EllipsisVertical className="text-default-700" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="rapot">
                            <Link href="/group/raport?source=student-page">Lihat Rapor</Link>
                          </DropdownItem>
                          <DropdownItem key="absen">
                            <Link href="/group/attendance?source=student-page">Lihat Rapor</Link>
                          </DropdownItem>
                          <DropdownItem key="copy">Copy link</DropdownItem>
                          <DropdownItem key="edit">Edit file</DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete file
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* ===== BODY ===== */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Kelas</p>
                      <p className="font-medium text-gray-800">
                        {murid.kelasJenjang?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Orang Tua</p>
                      <p className="font-medium text-gray-800">
                        {murid.nama_ortu}
                      </p>
                    </div>
                    {/* ===== DELETE BUTTON ===== */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <AddMurid {...addMurid} refetchMurid={refetchMurid} />
      <DeleteMurid
        {...deleteMurid}
        refetchMurid={refetchMurid}
        selectedIds={
          selectedIds.length ? selectedIds : selectedId ? [selectedId] : []
        }
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
};

export default Murid;
