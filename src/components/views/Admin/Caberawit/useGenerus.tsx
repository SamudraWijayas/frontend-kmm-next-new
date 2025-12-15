import useChangeUrl from "@/hooks/useChangeUrls";
import cabrawitServices from "@/services/caberawit.service";
import jenjangServices from "@/services/jenjang.service";
import { IGenerus } from "@/types/Generus";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useGenerus = () => {
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    jenjang: "",
  });
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getGenerus = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.jenjang) params += `&jenjang=${filter.jenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await cabrawitServices.getcaberawit(params);
    const { data } = res;
    return data;
  };

  const getJenjang = async () => {
    const { data } = await jenjangServices.getJenjang();
    return data.data;
  };

  const {
    data: dataJenjang,
    refetch: refetchJenjang,
    isPending: isPendingJenjang,
    isRefetching: isRefetchingJenjang,
  } = useQuery({
    queryKey: ["Jenjangs"],
    queryFn: getJenjang,
  });

  const {
    data: dataGenerus,
    isLoading: isLoadingGenerus,
    isRefetching: isRefetchingGenerus,
    refetch: refetchGenerus,
  } = useQuery({
    queryKey: [
      "Generus",
      currentLimit,
      currentPage,
      currentSearch,
      filter.jenis_kelamin,
      filter.jenjang,
      filter.minUsia,
      filter.maxUsia,
    ],
    queryFn: getGenerus,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
  });

  return {
    dataGenerus,
    isLoadingGenerus,
    isRefetchingGenerus,
    refetchGenerus,
    selectedId,
    setSelectedId,

    filter,
    setFilter,
    dataJenjang,
  };
};

export default useGenerus;
