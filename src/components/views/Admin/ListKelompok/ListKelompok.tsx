"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import useListKelompok from "./useListKelompok";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_KELOMPOK } from "./ListKelompok.constant";
import { useSearchParams } from "next/navigation";
import DropdownAction from "@/components/commons/DropdownAction";

import { IKelompok } from "@/types/Kelompok";
import { useDisclosure } from "@heroui/react";
import AddKelompok from "./AddKelompok";
import DeleteKelompok from "./DeleteKelompok";

const ListKelompok = () => {
  const searchParams = useSearchParams();

  const {
    dataKelompok,
    isLoadingKelompok,
    isRefetchingKelompok,
    refetchKelompok,
    selectedId,
    setSelectedId,
  } = useListKelompok();

  const { setUrl } = useChangeUrl();

  const addKelompok = useDisclosure();
  const deleteKelompok = useDisclosure();
  const updateKelompok = useDisclosure();

  // ✅ App Router tidak punya isReady, jadi cek param lewat searchParams
  useEffect(() => {
    if (searchParams) {
      setUrl();
    }
  }, [searchParams, setUrl]);

  const renderCell = useCallback(
    (kelompok: IKelompok, columnKey: React.Key) => {
      const cellValue = kelompok[columnKey as keyof typeof kelompok];
      switch (columnKey) {
        case "daerah":
          return kelompok.daerah?.name || "-";

        case "desa":
          return kelompok.desa?.name || "-";

        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(kelompok as IKelompok);
                updateKelompok.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(kelompok as IKelompok);
                deleteKelompok.onOpen();
              }}
              textButtonDetail="Detail Kelompok"
              textButtonDelete="Delete Kelompok"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteKelompok, setSelectedId, updateKelompok]
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""
  const hasParams = searchParams.toString() !== "";

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah Kelompok"
          columns={COLUMN_LIST_KELOMPOK}
          data={dataKelompok?.data || []}
          emptyContent="Kelompok Kosong"
          isLoading={isLoadingKelompok || isRefetchingKelompok}
          onClickButtonTopContent={addKelompok.onOpen}
          renderCell={renderCell}
          totalPages={dataKelompok?.pagination.totalPages || 0}
        />
      )}
      <AddKelompok {...addKelompok} refetchKelompok={refetchKelompok} />
      <DeleteKelompok
        {...deleteKelompok}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelompok={refetchKelompok}
      />
      {/* <UpdateKelompok
        {...updateKelompok}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelompok={refetchKelompok}
      /> */}
    </section>
  );
};

export default ListKelompok;
