import cabrawitServices from "@/services/caberawit.service";
import indikatorServices from "@/services/indikator.service";
import raporServices from "@/services/rapor.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const useRapotCaberawit = () => {
  const params = useParams();
  const id = params?.id as string;

  const getGenerus = async () => {
    const res = await cabrawitServices.getcaberawitById(id);
    const { data } = res;
    return data;
  };

  const {
    data: dataGenerus,
    isLoading: isLoadingGenerus,
    isRefetching: isRefetchingGenerus,
    refetch: refetchGenerus,
  } = useQuery({
    queryKey: ["Generus", id],
    queryFn: getGenerus,
    enabled: !!id,
  });

  const idKelas = dataGenerus?.data.kelasJenjangId;

  // indikator

  const getIndikator = async () => {
    const res = await indikatorServices.getIndikatorByKelas(idKelas);
    const { data } = res;
    return data;
  };

  const {
    data: dataIndikator,
    isLoading: isLoadingIndikator,
    isRefetching: isRefetchingIndikator,
    refetch: refetchIndikator,
  } = useQuery({
    queryKey: ["Indikator", idKelas],
    queryFn: getIndikator,
    enabled: !!idKelas,
  });

  // Rapor

  const getRapor = async () => {
    const res = await raporServices.getRapor(id);
    const { data } = res;
    return data;
  };

  const {
    data: dataRapor,
    isLoading: isLoadingRapor,
    isRefetching: isRefetchingRapor,
    refetch: refetchRapor,
  } = useQuery({
    queryKey: ["Rapor", id],
    queryFn: getRapor,
    enabled: !!id,
  });

  return {
    dataGenerus,
    isLoadingGenerus,
    dataIndikator,
    isLoadingIndikator,
    isRefetchingIndikator,
    dataRapor,
    isLoadingRapor,
    refetchRapor
  };
};

export default useRapotCaberawit;
