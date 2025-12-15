import kegiatanServices from "@/services/kegiatan.service";
import { useQuery } from "@tanstack/react-query";

const useKegiatan = () => {
  const getKegiatan = async () => {
    const res = await kegiatanServices.getKegiatan();
    const { data } = res;
    return data;
  };

  const {
    data: dataKegiatan,
    isLoading: isLoadingKegiatan,
    isRefetching: isRefetchingKegiatan,
    refetch: refetchKegiatan,
  } = useQuery({
    queryKey: ["Kegiatan"],
    queryFn: getKegiatan,
  });

  return {
    dataKegiatan,
    isLoadingKegiatan,
    isRefetchingKegiatan,
    refetchKegiatan,
  };
};

export default useKegiatan;
