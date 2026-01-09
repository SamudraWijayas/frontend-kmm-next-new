import authServices from "@/services/auth.service";
import countServices from "@/services/count.service";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useDashboard = () => {
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

  const totalDaerah = async () => {
    const res = await countServices.CountDaerahForAdmin();
    return res.data.data;
  };

  const { data: dataTotalDaerah, isLoading: isLoadingTotalDaerah } = useQuery({
    queryKey: ["TotalDaerah"],
    queryFn: totalDaerah,
  });

  // desa
  const totalDesa = async () => {
    const res = await countServices.CountDesaForAdmin();
    return res.data.data;
  };

  const { data: dataTotalDesa, isLoading: isLoadingTotalDesa } = useQuery({
    queryKey: ["TotalDesa"],
    queryFn: totalDesa,
  });

  //   kelompok
  const totalKelompok = async () => {
    const res = await countServices.CountKelompokForAdmin();
    return res.data.data;
  };

  const { data: dataTotalKelompok, isLoading: isLoadingTotalKelompok } =
    useQuery({
      queryKey: ["TotalKelompok"],
      queryFn: totalKelompok,
    });

  // desa
  const StatistikByDesa = async () => {
    const res = await generusServices.getStatistikByDesa(idDesa);
    return res.data.data;
  };

  const { data: dataStatistikByDesa, isLoading: isLoadingStatistikByDesa } =
    useQuery({
      queryKey: ["StatistikByDesa", idDesa],
      queryFn: StatistikByDesa,
      enabled: !!idDesa,
    });

  return {
    dataTotalDaerah,
    isLoadingTotalDaerah,
    dataTotalDesa,
    isLoadingTotalDesa,
    dataTotalKelompok,
    isLoadingTotalKelompok,
    dataStatistikByDesa,
    isLoadingStatistikByDesa,
  };
};

export default useDashboard;
