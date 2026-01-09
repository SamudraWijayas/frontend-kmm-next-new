import absenServices from "@/services/absen.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useGetAbsen = () => {
  const params = useParams();
  const id = params?.id as string;
  const getAbsen = async () => {
    const { data } = await absenServices.getAbsenByCaberawit(id);
    return data.data;
  };

  const { data: dataAbsen } = useQuery({
    queryKey: ["AbsenByGenerus", id],
    enabled: !!id,
    queryFn: getAbsen,
  });
  return {
    dataAbsen,
  };
};

export default useGetAbsen;
