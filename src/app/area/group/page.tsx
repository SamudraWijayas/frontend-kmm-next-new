import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListKelompok from "@/components/views/Daerah/ListKelompok";

const ListKelompokPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Kelompok">
      <ListKelompok />
    </DashboardLayout>
  );
};

export default ListKelompokPage;
