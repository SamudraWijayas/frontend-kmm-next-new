"use client";

import React from "react";
import useDetailKegiatan from "./useDetailKegiatan";
import { Tab, Tabs } from "@heroui/react";
import KehadiranTab from "./KehadiranTab";
import UpdateTab from "./UpdateTab";

const DetailKegiatan = () => {
  const {
    dataKegiatan,
    isLoadingKegiatan,
    isPendingMutateUpdateKegiatan,
    isSuccessMutateUpdateKegiatan,
    handleUpdateKegiatan,
  } = useDetailKegiatan();

  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="daftar hadir" title="Daftar Hadir">
        <KehadiranTab
          dataKegiatan={dataKegiatan}
          isLoading={isLoadingKegiatan}
        />
      </Tab>
      <Tab key="update" title="UpdateKegiatan">
        <UpdateTab
          dataKegiatan={dataKegiatan}
          onUpdate={handleUpdateKegiatan}
          isPendingUpdate={isPendingMutateUpdateKegiatan}
          isSuccessUpdate={isSuccessMutateUpdateKegiatan}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKegiatan;
