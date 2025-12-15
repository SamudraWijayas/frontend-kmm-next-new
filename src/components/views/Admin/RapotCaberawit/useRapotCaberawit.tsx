import raporServices from "@/services/rapor.service";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";

interface Filter {
  semester?: number | "";
  tahunAjaran?: string;
}

const useRaporCaberawit = (filter: Filter = {}) => {
  const params = useParams();
  const id = params?.id as string;

  const getRapor = async () => {
    let query = "";
    if (filter.semester) query += `semester=${filter.semester}&`;
    if (filter.tahunAjaran) query += `tahunAjaranId=${filter.tahunAjaran}&`;
    if (query.endsWith("&")) query = query.slice(0, -1); // hapus '&' terakhir

    const res = await raporServices.getRaporLengkapByCaberawit(id, query);
    return res.data;
  };

  const {
    data: dataRapor,
    isLoading: isLoadingRapor,
    isRefetching: isRefetchingRapor,
    refetch: refetchRapor,
  } = useQuery({
    queryKey: ["Rapor", id, filter.semester, filter.tahunAjaran],
    queryFn: getRapor,
    enabled: !!id, // Only run query if id is available
  });

  const getTA = async () => {
    const { data } = await raporServices.getTA();
    return data.data;
  };

  const { data: dataTA } = useQuery({
    queryKey: ["TA"],
    queryFn: getTA,
  });

  // addd

  return {
    dataRapor,
    isLoadingRapor,
    isRefetchingRapor,
    refetchRapor,
    dataTA,
  };
};

export default useRaporCaberawit;
