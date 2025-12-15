import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKegiatan from "@/components/views/Admin/DetailKegiatan";
import React from "react";

const DetailKegiatanPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Detail Kegiatan">
      <DetailKegiatan />
    </DashboardLayout>
  );
};

export default DetailKegiatanPage;
