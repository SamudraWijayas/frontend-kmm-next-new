import DashboardLayout from "@/components/layouts/DashboardLayout";
import Murid from "@/components/views/Kelompok/Murid/Murid";
import React from "react";

const GenerusPage = () => {
  return (
    <DashboardLayout type="KELOMPOK">
      <Murid />
    </DashboardLayout>
  );
};

export default GenerusPage;
