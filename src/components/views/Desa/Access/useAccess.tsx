import useChangeUrl from "@/hooks/useChangeUrls";
import authServices from "@/services/auth.service";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useAccess = () => {
  const [selectedId, setSelectedId] = useState<IUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // Di App Router, router selalu tersedia, jadi ini opsional
    setIsReady(true);
  }, []);
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });
  const idDesa = dataProfile?.desaId;

  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getUsers = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&desaId=${idDesa}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await userServices.getUser(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Users", currentLimit, currentPage, currentSearch, idDesa],
    queryFn: getUsers,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
  });

  return {
    dataUsers,
    isLoadingUsers,

    isRefetchingUsers,
    refetchUsers,

    selectedId,
    setSelectedId,
  };
};

export default useAccess;
