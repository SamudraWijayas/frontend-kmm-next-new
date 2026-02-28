export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Caberawit from "@/components/views/Admin/Caberawit";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Generus">
      <Caberawit />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
