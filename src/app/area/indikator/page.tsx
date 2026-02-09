import DashboardLayout from "@/components/layouts/DashboardLayout";
import Indikator from "@/components/views/Admin/Indikator";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Indikator">
      <Indikator />
    </DashboardLayout>
  );
};

export default ListDesaPage;
