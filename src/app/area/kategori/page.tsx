import DashboardLayout from "@/components/layouts/DashboardLayout";
import KategoriIndikator from "@/components/views/Admin/KategoriIndikator";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Kategori Indikator">
      <KategoriIndikator />
    </DashboardLayout>
  );
};

export default ListDesaPage;
