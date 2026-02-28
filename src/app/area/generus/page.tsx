export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Generus from "@/components/views/Daerah/Generus";


const ListGenerusPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Generus">
      <Generus />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
